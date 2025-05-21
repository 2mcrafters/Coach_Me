import React, { useState, useEffect } from 'react';
import { ReportForm } from '../components/reports/ReportForm';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useToast } from '../components/ui/use-toast';
import api from '@/redux/api';
import { format } from 'date-fns';

export function ReportsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [reports, setReports] = useState([]);
  const [sessions, setSessions] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
    fetchSessions();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get('/session-reports');
      setReports(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch reports',
        variant: 'destructive',
      });
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await api.get('/zoom-meetings');
      setSessions(response.data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    }
  };

  const handleCreateReport = async (data) => {
    try {
      await api.post('/session-reports', data);
      toast({
        title: 'Success',
        description: 'Report created successfully',
      });
      setIsFormOpen(false);
      fetchReports();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create report',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Session Reports</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>New Report</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Session Report</DialogTitle>
            </DialogHeader>
            <ReportForm
              onSubmit={handleCreateReport}
              sessionId={selectedSessionId}
              sessions={sessions}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{report.session?.topic || 'Session Report'}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(report.created_at), 'PPP')}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                report.engagement_level === 'high' ? 'bg-green-100 text-green-800' :
                report.engagement_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {report.engagement_level} engagement
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700">Progress Summary</h4>
                <p className="text-gray-600">{report.progress_summary}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Key Achievements</h4>
                <p className="text-gray-600">{report.achievements}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Next Steps</h4>
                <p className="text-gray-600">{report.next_steps}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}