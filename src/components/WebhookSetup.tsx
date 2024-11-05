import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createWebhook } from '../lib/api';

const webhookSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Valid webhook URL required'),
  secret: z.string().min(16, 'Secret must be at least 16 characters'),
  events: z.array(z.string()).min(1, 'Select at least one event'),
});

type WebhookFormData = z.infer<typeof webhookSchema>;

export function WebhookSetup() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = 
    useForm<WebhookFormData>({
      resolver: zodResolver(webhookSchema),
      defaultValues: {
        events: ['lead.created'],
      },
    });

  const onSubmit = async (data: WebhookFormData) => {
    try {
      await createWebhook(data);
      // Handle success (e.g., show notification)
    } catch (error) {
      console.error('Failed to create webhook:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Webhook Configuration</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Webhook Name</label>
          <input
            {...register('name')}
            placeholder="e.g., Contact Form Webhook"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Endpoint URL</label>
          <input
            {...register('url')}
            placeholder="https://your-site.com/webhook"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.url && (
            <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Secret Key</label>
          <input
            {...register('secret')}
            type="password"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.secret && (
            <p className="mt-1 text-sm text-red-600">{errors.secret.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Events</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                value="lead.created"
                {...register('events')}
                className="rounded border-gray-300 text-indigo-600"
              />
              <span className="ml-2 text-sm text-gray-600">Lead Created</span>
            </label>
          </div>
          {errors.events && (
            <p className="mt-1 text-sm text-red-600">{errors.events.message}</p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating Webhook...' : 'Create Webhook'}
          </button>
        </div>
      </form>
    </div>
  );
}