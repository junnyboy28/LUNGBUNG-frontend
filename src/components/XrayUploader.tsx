
import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface XrayUploaderProps {
  onFileSelected: (file: File) => void;
}

const XrayUploader = ({ onFileSelected }: XrayUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check file type
    if (!file.type.match('image/jpeg|image/jpg|image/png')) {
      toast.error('Please upload an image file (JPG or PNG)');
      return;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
    onFileSelected(file);
  };

  const handleClearFile = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 transition-all",
          isDragging ? "border-medical-blue bg-medical-blue/5" : "border-gray-200",
          previewUrl ? "bg-medical-gray-light" : "bg-white/50 backdrop-blur-sm"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="relative">
            <button 
              onClick={handleClearFile}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64 mb-4 overflow-hidden rounded-lg border border-gray-200">
                <img 
                  src={previewUrl} 
                  alt="X-ray Preview" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm text-medical-gray-dark font-medium">
                {selectedFile?.name} ({Math.round(selectedFile?.size! / 1024)}KB)
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            <div className="rounded-full bg-medical-blue/10 p-4">
              <Upload className="h-8 w-8 text-medical-blue" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-1">Upload X-ray Image</h3>
              <p className="text-medical-gray text-sm mb-4">Drag and drop your X-ray file or click to browse</p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-medical-blue hover:bg-medical-blue-dark"
              >
                Select File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileSelect}
              />
              <p className="mt-4 text-xs text-medical-gray">
                Supported formats: JPG, PNG (up to 5MB)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default XrayUploader;
