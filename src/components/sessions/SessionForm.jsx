import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/components/lib/utils';
import { CalendarIcon } from 'lucide-react';

export function SessionForm({ onSubmit, initialData }) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: initialData || {
      topic: '',
      startTime: new Date(),
      duration: 60,
      notes: '',
      objectives: ''
    }
  });

  const startTime = watch('startTime');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Topic</label>
        <Input {...register('topic', { required: 'Topic is required' })} />
        {errors.topic && <p className="text-red-500 text-sm">{errors.topic.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date and Time</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !startTime && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startTime ? format(startTime, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startTime}
              onSelect={(date) => setValue('startTime', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
        <Input 
          type="number" 
          {...register('duration', { 
            required: 'Duration is required',
            min: { value: 15, message: 'Minimum duration is 15 minutes' }
          })} 
        />
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

      <Button type="submit" className="w-full">Schedule Session</Button>
    </form>
  );
}