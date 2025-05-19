import React, { useState, useEffect } from 'react';
import { SessionForm } from '@/components/sessions/SessionForm';
import { SessionList } from '@/components/sessions/SessionList';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

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
      const response = await fetch('/api/sessions');
      const data = await response.json();
      setSessions(data);
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
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Session created successfully',
        });
        setIsFormOpen(false);
        fetchSessions();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create session',
        variant: 'destructive',
      });
    }
  };

  const handleEditSession = async (id) => {
    const session = sessions.find(s => s.id === id);
    setSelectedSession(session);
    setIsFormOpen(true);
  };

  const handleDeleteSession = async (id) => {
    try {
      const response = await fetch(`/api/sessions/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Session deleted successfully',
        });
        fetchSessions();
      }
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
            <Button>New Session</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedSession ? 'Edit Session' : 'Create New Session'}
              </DialogTitle>
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
        onEdit={handleEditSession}
        onDelete={handleDeleteSession}
      />
    </div>
  );
}