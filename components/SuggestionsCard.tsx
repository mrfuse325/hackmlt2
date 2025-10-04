
import React from 'react';

interface SuggestionsCardProps {
  suggestions: string;
  isLoading: boolean;
  error: string | null;
}

const Loader: React.FC = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const SuggestionsCard: React.FC<SuggestionsCardProps> = ({ suggestions, isLoading, error }) => {
  if (!suggestions && !isLoading && !error) {
    return null; // Don't render anything if there's no activity
  }

  const formatSuggestions = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-bold mt-4 mb-2 text-slate-700">{line.substring(3)}</h2>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="mb-2 ml-4 list-disc text-slate-600">{line.substring(2)}</li>;
        }
        return <p key={index} className="mb-3 text-slate-600">{line}</p>;
      });
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-slate-700">AI-Powered Insights</h2>
      {isLoading && <Loader />}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">An Error Occurred</p>
          <p>{error}</p>
        </div>
      )}
      {suggestions && !isLoading && (
        <div className="prose max-w-none">
            {formatSuggestions(suggestions)}
        </div>
      )}
    </div>
  );
};

export default SuggestionsCard;
