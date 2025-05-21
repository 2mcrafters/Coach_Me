import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function ReportForm({ onSubmit, sessions }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const handleSelectSession = (value) => {
    setValue('session_id', value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Select Session</Label>
        <Select onValueChange={handleSelectSession}>
          <SelectTrigger>
            <SelectValue placeholder="Select a session" />
          </SelectTrigger>
          <SelectContent>
            {sessions?.map((session) => (
              <SelectItem key={session.id} value={session.id}>
                {session.topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Progress Summary</Label>
        <Textarea
          {...register('progress_summary', { required: 'Progress summary is required' })}
          className="min-h-[100px]"
        />
        {errors.progress_summary && (
          <p className="text-red-500 text-sm">{errors.progress_summary.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Key Achievements</Label>
        <Textarea
          {...register('achievements')}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label>Next Steps</Label>
        <Textarea
          {...register('next_steps', { required: 'Next steps are required' })}
          className="min-h-[100px]"
        />
        {errors.next_steps && (
          <p className="text-red-500 text-sm">{errors.next_steps.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Client Engagement Level</Label>
        <Select onValueChange={(value) => setValue('engagement_level', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select engagement level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">Submit Report</Button>
    </form>
  );
}