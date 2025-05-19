import React, { useState, useEffect } from 'react';
import { ReportForm } from '../components/reports/ReportForm';
import { Button } from '../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useToast } from '../components/ui/use-toast';

export function ReportsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [reports, setReports] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports');
      const data = await response.json();
      setReports(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch reports',
        variant: 'destructive',
      });
    }
  };

  const handleCreateReport = async (data) => {
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Report created successfully',
        });
        setIsFormOpen(false);
        fetchReports();
      }
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Session Report</DialogTitle>
            </DialogHeader>
            <ReportForm
              onSubmit={handleCreateReport}
              sessionId={selectedSessionId}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Session Report</h3>
            <p className="text-gray-600 mb-2">{report.progressSummary}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Engagement Level: {report.engagementLevel}
              </span>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}