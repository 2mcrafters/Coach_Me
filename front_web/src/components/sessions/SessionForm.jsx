import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';

export function SessionForm({ onSubmit, initialData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input {...register('title', { required: 'Title is required' })} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <DatePicker />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
        <Input type="number" {...register('duration', { required: 'Duration is required' })} />
        {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <Textarea {...register('notes')} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Objectives</label>
        <Textarea {...register('objectives')} />
      </div>

      <Button type="submit">Save Session</Button>
    </form>
  );
}