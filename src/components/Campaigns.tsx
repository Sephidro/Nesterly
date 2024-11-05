import React, { useState } from 'react';
import { Plus, Mail, Users, Clock, Copy, Trash2, Edit, Play, Pause } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCampaigns, updateCampaign, deleteCampaign, duplicateCampaign } from '../lib/api';
import { CreateCampaignModal } from './CreateCampaignModal';

export function Campaigns() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns
  });

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'stopped' : 'active';
    await updateCampaign(id, { status: newStatus });
    queryClient.invalidateQueries({ queryKey: ['campaigns'] });
  };

  const handleDuplicate = async (id: string) => {
    await duplicateCampaign(id);
    queryClient.invalidateQueries({ queryKey: ['campaigns'] });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      await deleteCampaign(id);
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Email Campaigns</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns?.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {campaign.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{campaign.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  campaign.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : campaign.status === 'stopped'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                <div className="text-center">
                  <Mail className="w-5 h-5 text-gray-400 mx-auto" />
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {campaign.emailsSent}
                  </p>
                  <p className="text-xs text-gray-500">Sent</p>
                </div>
                <div className="text-center">
                  <Users className="w-5 h-5 text-gray-400 mx-auto" />
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {campaign.recipients}
                  </p>
                  <p className="text-xs text-gray-500">Recipients</p>
                </div>
                <div className="text-center">
                  <Clock className="w-5 h-5 text-gray-400 mx-auto" />
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {campaign.openRate}%
                  </p>
                  <p className="text-xs text-gray-500">Open Rate</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => handleDuplicate(campaign.id)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {/* TODO: Implement edit */}}
                  className="p-1 text-gray-400 hover:text-gray-500"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleStatusToggle(campaign.id, campaign.status)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                  title={campaign.status === 'active' ? 'Stop' : 'Start'}
                >
                  {campaign.status === 'active' ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(campaign.id)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['campaigns'] });
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
}