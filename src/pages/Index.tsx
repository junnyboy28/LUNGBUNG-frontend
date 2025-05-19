
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import XrayUploader from '@/components/XrayUploader';
import ResultsSection from '@/components/ResultsSection';
import LoadingState from '@/components/LoadingState';
import FooterSection from '@/components/FooterSection';
import { uploadXray, XrayPredictionResult } from '@/services/api';
import { toast } from 'sonner';
import { Wind } from 'lucide-react';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<XrayPredictionResult | null>(null);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    // Reset results when a new file is selected
    setResults(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.warning('Please upload an X-ray image first');
      return;
    }

    setIsLoading(true);
    try {
      const result = await uploadXray(selectedFile);
      setResults(result);
      toast.success('X-ray analysis complete!');
    } catch (error) {
      // Error is already handled in the API service
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResults(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-blue-light/30 to-background">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-lung-pattern opacity-[0.03]" />
        <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-background to-transparent" />
      </div>

      <Header />

      <main className="flex-grow container mx-auto px-4 md:px-6 py-10 max-w-6xl">
        <section className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 bg-medical-blue/10 rounded-full flex items-center justify-center">
              <Wind className="h-10 w-10 text-medical-blue" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-medical-blue-dark to-medical-blue bg-clip-text text-transparent">
            LUNGBUNG X-ray Analysis
          </h1>
          <p className="text-medical-gray-dark max-w-xl mx-auto leading-relaxed">
            Upload your lung X-ray image and get an instant AI-powered analysis with detailed report, summary, and recommendations.
          </p>
        </section>

        <section className="mb-10">
          <XrayUploader onFileSelected={handleFileSelected} />
          
          <div className="mt-6 flex justify-center">
            <div className="flex gap-4">
              <Button 
                onClick={handleSubmit}
                disabled={!selectedFile || isLoading}
                className="bg-medical-blue hover:bg-medical-blue-dark"
              >
                {isLoading ? 'Processing...' : 'Analyze X-ray'}
              </Button>
              {(selectedFile || results) && (
                <Button 
                  onClick={handleReset} 
                  variant="outline"
                  className="border-medical-gray hover:bg-medical-gray-light"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </section>

        {isLoading && <LoadingState />}
        
        {results && !isLoading && (
          <section className="mb-10 animate-fade-in">
            <ResultsSection 
              report={results.report} 
              summary={results.summary} 
              suggestions={results.suggestions} 
            />
          </section>
        )}
      </main>

      <FooterSection />
    </div>
  );
};

export default Index;
