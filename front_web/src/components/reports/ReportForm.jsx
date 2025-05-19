import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';

export function ReportForm({ onSubmit, sessionId }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register('sessionId')} value={sessionId} />

      <div>
        <label className="block text-sm font-medium mb-1">Progress Summary</label>
        <Textarea {...register('progressSummary', { required: 'Progress summary is required' })} />
        {errors.progressSummary && <p className="text-red-500 text-sm">{errors.progressSummary.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Key Achievements</label>
        <Textarea {...register('achievements')} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Next Steps</label>
        <Textarea {...register('nextSteps', { required: 'Next steps are required' })} />
        {errors.nextSteps && <p className="text-red-500 text-sm">{errors.nextSteps.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Client Engagement Level</label>
        <Select {...register('engagementLevel', { required: 'Engagement level is required' })}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Select>
      </div>

      <Button type="submit">Submit Report</Button>
    </form>
  );
}