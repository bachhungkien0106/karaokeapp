import React, { useState, useEffect } from 'react';
import { SongRecommendation } from '../types';
import SongCard from './SongCard';
import { RotateCcw, Home, Sparkles, Shuffle, Quote } from 'lucide-react';

interface ResultsProps {
  recommendations: SongRecommendation[];
  story?: string;
  favorites: SongRecommendation[];
  onToggleFavorite: (song: SongRecommendation) => void;
  onReset: () => void;
  isFavoritesView?: boolean;
}

const Results: React.FC<ResultsProps> = ({ 
  recommendations, 
  story,
  favorites,
  onToggleFavorite, 
  onReset, 
  isFavoritesView = false 
}) => {
  const [displayedSongs, setDisplayedSongs] = useState<SongRecommendation[]>(recommendations);

  useEffect(() => {
    setDisplayedSongs(recommendations);
  }, [recommendations]);
  
  const isFavorite = (song: SongRecommendation) => {
    return favorites.some(f => f.title === song.title && f.artist === song.artist);
  };

  const handleShuffle = () => {
    const shuffled = [...displayedSongs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setDisplayedSongs(shuffled);
  };

  if (isFavoritesView && recommendations.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in space-y-6">
        <div className="bg-white/5 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-gray-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">No Favorites Yet</h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Start exploring and click the heart icon on songs you want to save for your next karaoke night!
          </p>
        </div>
        <button
          onClick={onReset}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-bold shadow-lg hover:scale-105 transition-all"
        >
          Find Songs
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-extrabold text-white neon-text">
          {isFavoritesView ? 'Your Setlist' : 'Your Stage Awaits'}
        </h2>
        {story && !isFavoritesView ? (
          <div className="max-w-3xl mx-auto mt-6 mb-8 relative">
             <div className="absolute top-0 left-0 -mt-4 -ml-4 opacity-20">
                <Quote className="w-12 h-12 text-pink-500 transform rotate-180" />
             </div>
             <p className="text-xl md:text-2xl text-pink-100 font-light italic leading-relaxed px-8">
               "{story}"
             </p>
             <div className="absolute bottom-0 right-0 -mb-4 -mr-4 opacity-20">
                <Quote className="w-12 h-12 text-purple-500" />
             </div>
          </div>
        ) : (
          <p className="text-gray-400 text-lg">
             {isFavoritesView 
              ? 'The collection of your go-to karaoke anthems.' 
              : 'Here are 6 songs perfectly tuned to your vibe.'}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedSongs.map((song, index) => (
          <SongCard 
            key={`${song.title}-${song.artist}-${index}`} 
            song={song} 
            index={index} 
            isFavorite={isFavorite(song)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8 pb-16">
        {displayedSongs.length > 1 && (
          <button
            onClick={handleShuffle}
            className="group flex items-center gap-2 px-8 py-3 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 rounded-full text-white font-semibold transition-all hover:scale-105"
          >
            <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Shuffle Setlist
          </button>
        )}

        <button
          onClick={onReset}
          className="group flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-semibold transition-all hover:scale-105"
        >
          {isFavoritesView ? (
             <>
               <Home className="w-5 h-5" /> Back to Home
             </>
          ) : (
            <>
              <RotateCcw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" />
              Start Over
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Results;