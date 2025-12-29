import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { Music, Mic2, Calendar, Smile, Users, Globe, Activity, Zap, ArrowLeft } from 'lucide-react';

interface PreferenceFormProps {
  onSubmit: (prefs: UserPreferences) => void;
  onBack: () => void;
}

const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSubmit, onBack }) => {
  const [prefs, setPrefs] = useState<UserPreferences>({
    mood: 'Energetic',
    genre: 'Pop',
    difficulty: 'Easy',
    era: '2000s',
    occasion: 'Night out with friends',
    nation: 'USA',
    vocalRange: 'Unsure',
    danceability: 'Any'
  });

  const handleChange = (field: keyof UserPreferences, value: string) => {
    setPrefs(prev => ({ ...prev, [field]: value }));
  };

  const genres = ['Pop', 'Rock', 'R&B', 'Hip Hop', 'Country', 'Disco', 'Dance/Electronic', 'Show Tunes', 'Indie', 'Metal'];
  const moods = ['Energetic', 'Sentimental', 'Funny', 'Romantic', 'Angry', 'Chill', 'Dramatic'];
  const eras = ['Current Hits', '2010s', '2000s', '90s', '80s', '70s', 'Oldies'];
  const difficulties = ['Easy (Safe bets)', 'Medium (Some range)', 'Hard (Show off)', 'Expert (Whitney/Mariah level)'];
  const occasions = ['Night out with friends', 'Office Party', 'Dance Party', 'Solo Practice', 'Date Night', 'Heartbreak Healing', 'Pre-game Hype'];
  const nations = ['USA', 'UK', 'International', 'South Korea (K-Pop)', 'Japan (J-Pop)', 'Latin America', 'Philippines (OPM)', 'India (Bollywood)', 'China (C-Pop)', 'France', 'Germany', 'Italy', 'Spain', 'Brazil'];
  const vocalRanges = ['Soprano (High Female)', 'Alto (Low Female)', 'Tenor (High Male)', 'Baritone/Bass (Low Male)', 'Unsure'];
  const danceLevels = ['Any', 'Low (Ballad)', 'Medium (Groovy)', 'High (Dance Hit)'];

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel p-8 rounded-2xl shadow-2xl animate-fade-in-up relative">
      
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all"
        aria-label="Back to Home"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
        Customize Your Setlist
      </h2>

      <div className="space-y-6">
        
        {/* Genre */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-lg font-medium text-pink-200">
            <Music className="w-5 h-5" /> Favorite Genre
          </label>
          <div className="flex flex-wrap gap-2">
            {genres.map(g => (
              <button
                key={g}
                onClick={() => handleChange('genre', g)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  prefs.genre === g 
                    ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] scale-105' 
                    : 'bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-lg font-medium text-cyan-200">
            <Smile className="w-5 h-5" /> Current Mood
          </label>
          <select 
            value={prefs.mood}
            onChange={(e) => handleChange('mood', e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {moods.map(m => <option key={m} value={m} className="bg-slate-800">{m}</option>)}
          </select>
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-lg font-medium text-purple-200">
            <Mic2 className="w-5 h-5" /> Vocal Confidence
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {difficulties.map(d => {
              const val = d.split(' (')[0]; // Extract just the main level
              return (
                <button
                  key={d}
                  onClick={() => handleChange('difficulty', val)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    prefs.difficulty === val
                      ? 'border-purple-500 bg-purple-500/20 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {/* Era & Region & Occasion & Range Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-lg font-medium text-yellow-200">
              <Calendar className="w-5 h-5" /> Era
            </label>
            <select 
              value={prefs.era}
              onChange={(e) => handleChange('era', e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {eras.map(e => <option key={e} value={e} className="bg-slate-800">{e}</option>)}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-lg font-medium text-blue-200">
              <Globe className="w-5 h-5" /> Region / Language
            </label>
            <select 
              value={prefs.nation}
              onChange={(e) => handleChange('nation', e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {nations.map(n => <option key={n} value={n} className="bg-slate-800">{n}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-lg font-medium text-green-200">
              <Users className="w-5 h-5" /> Occasion
            </label>
            <select 
              value={prefs.occasion}
              onChange={(e) => handleChange('occasion', e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {occasions.map(o => <option key={o} value={o} className="bg-slate-800">{o}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-lg font-medium text-orange-200">
              <Activity className="w-5 h-5" /> Vocal Range
            </label>
            <select 
              value={prefs.vocalRange}
              onChange={(e) => handleChange('vocalRange', e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {vocalRanges.map(r => <option key={r} value={r} className="bg-slate-800">{r}</option>)}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center gap-2 text-lg font-medium text-rose-200">
              <Zap className="w-5 h-5" /> Danceability
            </label>
            <select 
              value={prefs.danceability}
              onChange={(e) => handleChange('danceability', e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {danceLevels.map(d => <option key={d} value={d} className="bg-slate-800">{d}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={() => onSubmit(prefs)}
          className="w-full mt-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-xl font-bold text-white shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Mic2 className="w-6 h-6" /> Get Recommendations
        </button>
      </div>
    </div>
  );
};

export default PreferenceForm;