import React, { useState } from 'react';
import { Disc, Sparkles, Users, Play, Headphones, ArrowLeft } from 'lucide-react';

interface DJAgentFormProps {
  onSubmit: (vision: string, crowd: string) => void;
  onBack: () => void;
}

const DJAgentForm: React.FC<DJAgentFormProps> = ({ onSubmit, onBack }) => {
  const [vision, setVision] = useState('');
  const [crowd, setCrowd] = useState('Mixed Crowd');

  const crowds = ['Mixed Crowd', 'Close Friends', 'Co-workers', 'Family', 'Strangers/Bar Crowd', 'Couples'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vision.trim()) {
      onSubmit(vision, crowd);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto glass-panel p-8 rounded-2xl shadow-2xl animate-fade-in-up relative overflow-hidden">
      {/* Decorative background for the DJ Deck */}
      <div className="absolute top-0 right-0 p-10 opacity-10">
        <Disc className="w-64 h-64 animate-spin-slow" />
      </div>

      <div className="relative z-10">
        <button 
          onClick={onBack}
          className="absolute top-0 left-0 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all -ml-2 -mt-2 mb-4"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6 mt-8">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full">
            <Headphones className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            DJ Agent <span className="text-purple-400">Mode</span>
          </h2>
        </div>
        
        <p className="text-gray-300 mb-8 text-lg">
          Describe your dream karaoke party, and our AI Agent will curate the perfect flow.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-medium text-purple-200">
              <Sparkles className="w-5 h-5" /> What's the Vision?
            </label>
            <textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="e.g., 'A messy breakup party where we scream power ballads', 'Disney villains only', '90s Boy Band vs Girl Group battle', 'High energy songs to wake up a boring office party'..."
              className="w-full h-32 bg-black/30 border border-purple-500/30 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-lg"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-medium text-blue-200">
              <Users className="w-5 h-5" /> Who's in the crowd?
            </label>
            <div className="flex flex-wrap gap-2">
              {crowds.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCrowd(c)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    crowd === c
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-gray-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!vision.trim()}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-xl font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Disc className={`w-6 h-6 ${vision.trim() ? 'animate-spin' : ''}`} />
            Spin the Deck
          </button>

        </form>
      </div>
    </div>
  );
};

export default DJAgentForm;