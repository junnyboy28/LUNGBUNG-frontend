
import { toast } from 'sonner';

export interface XrayPredictionResult {
  report: string;
  summary: string;
  suggestions: string;
}

export const uploadXray = async (file: File): Promise<XrayPredictionResult> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/predict', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to process X-ray');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading X-ray:', error);
    let errorMessage = 'An unexpected error occurred';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    toast.error(errorMessage);
    throw error;
  }
};
