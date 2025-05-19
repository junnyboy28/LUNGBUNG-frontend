
import React, { useState } from 'react';
import { ChevronDown, FileText, ListChecks, Lightbulb } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ResultProps {
  report: string;
  summary: string;
  suggestions: string;
}

const ResultsSection = ({ report, summary, suggestions }: ResultProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Analysis Results</h2>
      
      <Accordion type="single" collapsible className="w-full" defaultValue="report">
        <AccordionItem value="report">
          <AccordionTrigger className="bg-white rounded-t-lg px-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-medical-blue" />
              <span className="font-medium">Detailed Report</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-white px-6 py-4 rounded-b-lg">
            <div className="space-y-2">
              <p className="text-medical-gray-dark leading-relaxed">{report}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="summary">
          <AccordionTrigger className="bg-white rounded-t-lg px-4">
            <div className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-medical-blue" />
              <span className="font-medium">Summary</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-white px-6 py-4 rounded-b-lg">
            <div className="space-y-2">
              <p className="text-medical-gray-dark leading-relaxed">{summary}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="suggestions">
          <AccordionTrigger className="bg-white rounded-t-lg px-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-medical-blue" />
              <span className="font-medium">Suggestions/Recommendations</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-white px-6 py-4 rounded-b-lg">
            <div className="space-y-2">
              <p className="text-medical-gray-dark leading-relaxed">{suggestions}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ResultsSection;
