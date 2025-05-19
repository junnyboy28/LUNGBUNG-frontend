
import React from 'react';
import { Heart } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="w-full py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-sm text-medical-gray">
          <p>© 2025 LUNGBUNG. All rights reserved.</p>
          <div className="flex items-center gap-1 mt-2 md:mt-0">
            <span>Providing X-ray Vision</span>
            <Heart className="h-4 w-4 text-medical-blue" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
