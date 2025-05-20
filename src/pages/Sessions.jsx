import React, { useState, useEffect } from 'react';
import { SessionForm } from '@/components/sessions/SessionForm';
import { SessionList } from '@/components/sessions/SessionList';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import api from '@/redux/api';

export function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await api.get('/zoom-meetings');
      setSessions(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch sessions',
        variant: 'destructive',
      });
    }
  };

  const handleCreateSession = async (data) => {
    try {
      const response = await api.post('/zoom-meetings', data);
      toast({
        title: 'Success',
        description: 'Session scheduled successfully',
      });
      setIsFormOpen(false);
      fetchSessions();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to schedule session',
        variant: 'destructive',
      });
    }
  };

  const handleJoinSession = async (meetingId) => {
    try {
      const response = await api.get(`/zoom-meetings/${meetingId}/join`);
      window.open(response.data.join_url, '_blank');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to join session',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteSession = async (id) => {
    try {
      await api.delete(`/zoom-meetings/${id}`);
      toast({
        title: 'Success',
        description: 'Session deleted successfully',
      });
      fetchSessions();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete session',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Coaching Sessions</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>Schedule New Session</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Zoom Session</DialogTitle>
            </DialogHeader>
            <SessionForm 
              onSubmit={handleCreateSession} 
              initialData={selectedSession}
            />
          </DialogContent>
        </Dialog>
      </div>

      <SessionList
        sessions={sessions}
        onJoin={handleJoinSession}
        onDelete={handleDeleteSession}
      />
    </div>
  );
}