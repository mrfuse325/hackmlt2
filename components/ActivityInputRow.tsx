
import React from 'react';
import { Activity, TimeFeeling } from '../types';
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from '@heroicons/react/24/solid';

interface ActivityInputRowProps {
  activity: Activity;
  onActivityChange: (id: string, hours: number, feeling: TimeFeeling) => void;
}

const FeelingButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  activeClass: string;
}> = ({ label, icon, isActive, onClick, activeClass }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex-1 flex items-center justify-center p-2 text-xs font-semibold rounded-md transition-all duration-200 ${
      isActive ? `${activeClass} text-white shadow` : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
    }`}
  >
    {icon}
    <span className="ml-1.5 hidden sm:inline">{label}</span>
  </button>
);

const ActivityInputRow: React.FC<ActivityInputRowProps> = ({ activity, onActivityChange }) => {
  const { id, name, icon: Icon, hours, feeling } = activity;

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHours = parseInt(e.target.value, 10) || 0;
    onActivityChange(id, Math.max(0, newHours), feeling);
  };

  const handleFeelingChange = (newFeeling: TimeFeeling) => {
    onActivityChange(id, hours, newFeeling);
  };

  return (
    <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center p-2 rounded-lg hover:bg-slate-50">
      <div className="col-span-12 sm:col-span-5 flex items-center">
        <Icon className="h-6 w-6 text-blue-500 mr-3" />
        <label htmlFor={`hours-${id}`} className="font-medium text-slate-700">
          {name}
        </label>
      </div>
      
      <div className="col-span-5 sm:col-span-3">
        <input
          type="number"
          id={`hours-${id}`}
          value={hours}
          onChange={handleHoursChange}
          min="0"
          className="w-full px-3 py-2 text-center bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="col-span-7 sm:col-span-4 flex items-center space-x-1 sm:space-x-2">
        <FeelingButton
          label="Less"
          icon={<ArrowDownIcon className="h-4 w-4" />}
          isActive={feeling === TimeFeeling.LESS}
          onClick={() => handleFeelingChange(TimeFeeling.LESS)}
          activeClass="bg-red-500"
        />
        <FeelingButton
          label="Right"
          icon={<CheckIcon className="h-4 w-4" />}
          isActive={feeling === TimeFeeling.RIGHT}
          onClick={() => handleFeelingChange(TimeFeeling.RIGHT)}
          activeClass="bg-green-500"
        />
        <FeelingButton
          label="More"
          icon={<ArrowUpIcon className="h-4 w-4" />}
          isActive={feeling === TimeFeeling.MORE}
          onClick={() => handleFeelingChange(TimeFeeling.MORE)}
          activeClass="bg-blue-500"
        />
      </div>
    </div>
  );
};

export default ActivityInputRow;
