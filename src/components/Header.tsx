
import React from 'react';
import { Wind } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <header className={cn("w-full py-4 px-4 md:px-8 flex items-center justify-between", className)} {...props}>
      <div className="flex items-center gap-2">
        <Wind className="h-8 w-8 text-medical-blue animate-float" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-medical-blue to-medical-blue-dark bg-clip-text text-transparent">
          LUNGBUNG
        </h1>
      </div>
      <div className="text-sm text-medical-gray">X-ray Vision</div>
    </header>
  );
};

export default Header;
