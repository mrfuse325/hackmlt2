
import React, { useState, useMemo, useCallback } from 'react';
import { Activity, TimeFeeling } from './types';
import { INITIAL_ACTIVITIES, TOTAL_HOURS_IN_WEEK } from './constants';
import { getSuggestions } from './services/geminiService';
import Header from './components/Header';
import ActivityInputRow from './components/ActivityInputRow';
import TimeChart from './components/TimeChart';
import SuggestionsCard from './components/SuggestionsCard';

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleActivityChange = useCallback((id: string, hours: number, feeling: TimeFeeling) => {
    setActivities(prev =>
      prev.map(act => (act.id === id ? { ...act, hours, feeling } : act))
    );
  }, []);

  const { totalHoursUsed, remainingHours } = useMemo(() => {
    const total = activities.reduce((sum, act) => sum + act.hours, 0);
    return {
      totalHoursUsed: total,
      remainingHours: TOTAL_HOURS_IN_WEEK - total,
    };
  }, [activities]);

  const handleAnalyzeTime = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions('');
    try {
      const result = await getSuggestions(activities, remainingHours);
      setSuggestions(result);
    } catch (err) {
      setError('Sorry, I had trouble generating suggestions. Please check your connection and API key, then try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = useMemo(() => {
    const usedActivities = activities.filter(a => a.hours > 0);
    const freeTime = { id: 'free', name: 'Free Time', hours: remainingHours > 0 ? remainingHours : 0, feeling: TimeFeeling.RIGHT };
    return [...usedActivities, freeTime];
  }, [activities, remainingHours]);


  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-slate-700">Your Weekly Hours</h2>
            <p className="text-slate-500 mb-6">Log how you spend your time and how you feel about it.</p>
            <div className="space-y-4">
              {activities.map(activity => (
                <ActivityInputRow
                  key={activity.id}
                  activity={activity}
                  onActivityChange={handleActivityChange}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-slate-700">Weekly Summary</h2>
              <div className="space-y-3 text-lg">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Hours in Week:</span>
                  <span className="font-semibold text-slate-800">{TOTAL_HOURS_IN_WEEK}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hours Accounted For:</span>
                  <span className="font-semibold text-blue-600">{totalHoursUsed}</span>
                </div>
                <div className="flex justify-between border-t pt-3 mt-3">
                  <span className="font-bold text-slate-600">Free Hours Left:</span>
                  <span className={`font-bold ${remainingHours < 0 ? 'text-red-500' : 'text-green-600'}`}>
                    {remainingHours}
                  </span>
                </div>
              </div>
               {remainingHours < 0 && (
                <p className="mt-4 text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                  Warning: You've allocated more hours than available in a week. Please review your entries.
                </p>
              )}
              <div className="w-full h-72 mt-4">
                <TimeChart data={chartData} />
              </div>
            </div>

            <div className="sticky top-8">
              <button
                onClick={handleAnalyzeTime}
                disabled={isLoading || remainingHours < 0}
                className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {isLoading ? 'Analyzing...' : 'Get AI Suggestions'}
              </button>
            </div>
          </div>
        </div>
        
        <SuggestionsCard 
          suggestions={suggestions}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;
