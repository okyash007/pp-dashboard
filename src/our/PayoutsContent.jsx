import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import Tips from './Tips';
import { toast } from 'sonner';

const PayoutsContent = () => {
  const { user, token } = useAuthStore();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCSV = async () => {
    if (!user?.creator_id) {
      toast.error('Creator ID is required');
      return;
    }

    if (!token) {
      toast.error('Authentication required');
      return;
    }

    setIsDownloading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/tip/${user.creator_id}/unsettled`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: 'Failed to download CSV',
        }));
        throw new Error(errorData.message || 'Failed to download CSV');
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `unsettled_tips_${user.creator_id}_${Date.now()}.csv`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('CSV downloaded successfully!');
    } catch (error) {
      console.error('Error downloading CSV:', error);
      toast.error(`Error downloading CSV: ${error.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-black text-black uppercase tracking-tight'>
            Payouts
          </h1>
          <p className='text-sm text-black/60 mt-1'>
            View your tip amounts and download payout reports
          </p>
        </div>
        <Button
          onClick={handleDownloadCSV}
          disabled={isDownloading || !user?.creator_id}
          className='gap-2 h-auto bg-[#828BF8] hover:bg-[#828BF8]/90 text-white font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200'
        >
          <Download className='h-4 w-4' />
          {isDownloading ? 'Downloading...' : 'Download Transfer Batch CSV'}
        </Button>
      </div>

      <Tips />
    </div>
  );
};

export default PayoutsContent;

