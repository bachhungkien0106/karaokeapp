import React from 'react';
import { SongRecommendation } from '../types';
import { Mic, Music2, Heart, Youtube, Zap, Move, Clock } from 'lucide-react';

interface SongCardProps {
  song: SongRecommendation;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (song: SongRecommendation) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, index, isFavorite, onToggleFavorite }) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'Hard': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
      case 'Expert': return 'text-red-500 border-red-500/30 bg-red-500/10';
      default: return 'text-gray-400';
    }
  };

  const handleYoutubeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(song.youtubeQuery)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="glass-panel rounded-xl p-6 relative overflow-hidden group hover:bg-white/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] hover:border-pink-500/30 flex flex-col h-full"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background Number Watermark */}
      <div className="absolute top-0 left-0 p-2 opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none">
        <span className="text-6xl font-black text-white/5 select-none">{index + 1}</span>
      </div>

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(song);
        }}
        className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-white/10 transition-all active:scale-90"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart 
          className={`w-6 h-6 transition-all duration-300 ${
            isFavorite 
              ? 'fill-pink-500 text-pink-500 scale-110 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]' 
              : 'text-gray-400 hover:text-pink-300'
          }`} 
        />
      </button>

      <div className="flex justify-between items-start mb-4 pr-10">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-pink-300 transition-colors pr-2 leading-tight">
            {song.title}
          </h3>
          <p className="text-lg text-gray-300 flex items-center gap-2">
            <Music2 className="w-4 h-4" /> {song.artist}
          </p>
        </div>
      </div>
      
      <div className="mb-4 flex flex-wrap gap-2 items-center">
         <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getDifficultyColor(song.difficultyRating)}`}>
            {song.difficultyRating}
          </span>
         <span className="inline-block px-3 py-1 rounded-full text-xs font-bold border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 uppercase tracking-wider">
            {song.vibe}
          </span>
          {song.duration && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border border-white/10 bg-white/5 text-gray-400">
              <Clock className="w-3 h-3" /> {song.duration}
            </span>
          )}
      </div>

      <div className="space-y-4 mb-6 flex-grow">
        <div className="bg-black/20 p-3 rounded-lg border border-white/5">
            <p className="text-sm text-gray-300 italic">"{song.reason}"</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
            {/* Vocal Tip */}
            <div className="flex items-start gap-2">
                <Mic className="w-4 h-4 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-widest block mb-1">Vocal Tip</span>
                    <span className="text-sm text-gray-200">{song.singingTip}</span>
                </div>
            </div>

            {/* Stage Action */}
            <div className="flex items-start gap-2">
                <Move className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-widest block mb-1">Stage Action</span>
                    <span className="text-sm text-gray-200">{song.actionMove || "Freestyle and have fun!"}</span>
                </div>
            </div>
        </div>
      </div>

      <button
        onClick={handleYoutubeClick}
        className={`w-full mt-auto py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-bold transition-all transform hover:-translate-y-1 shadow-lg ${
          song.performanceType === 'Dancing'
          ? 'bg-[#FF0000] hover:bg-[#CC0000] text-white shadow-red-900/30'
          : 'bg-white hover:bg-gray-200 text-red-600 shadow-white/10'
        }`}
      >
        {song.performanceType === 'Dancing' ? (
          <>
            <Zap className="w-5 h-5 fill-current" /> Watch Dance Video
          </>
        ) : (
          <>
            <Youtube className="w-5 h-5" /> Play Karaoke Version
          </>
        )}
      </button>
    </div>
  );
};

export default SongCard;