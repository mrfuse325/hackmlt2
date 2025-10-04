
import React from 'react';
import { ClockIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <ClockIcon className="h-8 w-8 text-blue-600 mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          College Time Planner <span className="text-blue-600">AI</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
