import React, { useState, useEffect } from 'react';
import { Mic, Music, Sparkles, Heart, Headphones, Info } from 'lucide-react';
import PreferenceForm from './components/PreferenceForm';
import DJAgentForm from './components/DJAgentForm';
import Results from './components/Results';
import Loading from './components/Loading';
import AboutModal from './components/AboutModal';
import { getKaraokeRecommendations, generateDJPlaylist } from './services/geminiService';
import { AppState, SongRecommendation, UserPreferences } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('HOME');
  const [recommendations, setRecommendations] = useState<SongRecommendation[]>([]);
  const [currentStory, setCurrentStory] = useState<string>("");
  const [favorites, setFavorites] = useState<SongRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Load favorites from local storage on mount
  useEffect(() => {
    const storedFavs = localStorage.getItem('karaoke_favorites');
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  const toggleFavorite = (song: SongRecommendation) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.title === song.title && f.artist === song.artist);
      let newFavs;
      if (exists) {
        newFavs = prev.filter(f => !(f.title === song.title && f.artist === song.artist));
      } else {
        newFavs = [...prev, song];
      }
      localStorage.setItem('karaoke_favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const handleStartClassic = () => {
    setAppState('FORM');
    setError(null);
  };

  const handleStartDJ = () => {
    setAppState('DJ_FORM');
    setError(null);
  };

  const handleFormSubmit = async (prefs: UserPreferences) => {
    setAppState('LOADING');
    try {
      const result = await getKaraokeRecommendations(prefs);
      setRecommendations(result.songs);
      setCurrentStory(result.story);
      setAppState('RESULTS');
    } catch (err) {
      console.error(err);
      setError("Sorry, the system is down (Error fetching recommendations). Please try again.");
      setAppState('ERROR');
    }
  };

  const handleDJSubmit = async (vision: string, crowd: string) => {
    setAppState('LOADING');
    try {
      const result = await generateDJPlaylist(vision, crowd);
      setRecommendations(result.songs);
      setCurrentStory(result.story);
      setAppState('RESULTS');
    } catch (err) {
      console.error(err);
      setError("The DJ turntable is stuck! (Error generating playlist). Please try again.");
      setAppState('ERROR');
    }
  }

  const handleReset = () => {
    setAppState('HOME');
    setRecommendations([]);
    setCurrentStory("");
    setError(null);
  };

  const handleViewFavorites = () => {
    setAppState('FAVORITES');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-transparent selection:bg-pink-500 selection:text-white overflow-x-hidden relative">
      
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/30 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="w-full p-6 flex items-center justify-between glass-panel border-b-0 border-t-0 border-x-0 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleReset}>
          <div className="bg-gradient-to-tr from-pink-500 to-purple-600 p-2 rounded-lg shadow-lg">
            <Mic className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white hidden sm:block">
            Karaoke<span className="text-pink-400">Genius</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAboutOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white"
            aria-label="How it works"
          >
            <Info className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Guide</span>
          </button>

          <button 
            onClick={handleViewFavorites}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border ${
              appState === 'FAVORITES' 
                ? 'bg-pink-600 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]' 
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-pink-500/50 text-gray-300 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-current' : ''}`} />
            <span className="font-semibold hidden sm:inline">Favorites</span>
            {favorites.length > 0 && (
              <span className="bg-white text-pink-600 text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-16">
        
        {appState === 'HOME' && (
          <div className="flex flex-col items-center justify-center text-center space-y-12 animate-fade-in py-8">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 blur-2xl opacity-30 rounded-full"></div>
              <Music className="w-24 h-24 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            </div>
            
            <div className="max-w-3xl space-y-4">
              <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-pink-400 leading-tight">
                Don't Just Sing.<br />Perform.
              </h1>
              <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
                Select your path to the perfect setlist.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
              {/* Option 1: Quick Filter */}
              <button
                onClick={handleStartClassic}
                className="group relative p-8 glass-panel rounded-2xl hover:bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all duration-300 text-left hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]"
              >
                <div className="absolute top-6 right-6 p-3 bg-pink-500/20 rounded-full text-pink-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Quick Filter</h3>
                <p className="text-gray-400 mb-6">Build a setlist by selecting specific genres, difficulty levels, and moods.</p>
                <span className="text-pink-400 font-bold group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                  Start Filter Mode &rarr;
                </span>
              </button>

              {/* Option 2: DJ Agent */}
              <button
                onClick={handleStartDJ}
                className="group relative p-8 glass-panel rounded-2xl hover:bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-left hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
              >
                <div className="absolute top-6 right-6 p-3 bg-purple-500/20 rounded-full text-purple-400 group-hover:scale-110 transition-transform">
                  <Headphones className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">DJ Agent</h3>
                <p className="text-gray-400 mb-6">Describe your party vision (e.g. "80s Miami Vice birthday") and let AI curate the vibe.</p>
                <span className="text-purple-400 font-bold group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                  Ask the DJ &rarr;
                </span>
              </button>
            </div>
          </div>
        )}

        {appState === 'FORM' && (
          <PreferenceForm onSubmit={handleFormSubmit} onBack={handleReset} />
        )}

        {appState === 'DJ_FORM' && (
          <DJAgentForm onSubmit={handleDJSubmit} onBack={handleReset} />
        )}

        {appState === 'LOADING' && (
          <Loading />
        )}

        {appState === 'RESULTS' && (
          <Results 
            recommendations={recommendations} 
            story={currentStory}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onReset={handleReset} 
          />
        )}

        {appState === 'FAVORITES' && (
          <Results 
            recommendations={favorites} // Pass favorites as the main list
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onReset={handleReset}
            isFavoritesView={true}
          />
        )}

        {appState === 'ERROR' && (
            <div className="text-center p-8 glass-panel rounded-xl max-w-lg mx-auto">
                <div className="text-red-400 text-6xl mb-4">:(</div>
                <h3 className="text-2xl font-bold mb-2">Technical Difficulties</h3>
                <p className="text-gray-300 mb-6">{error}</p>
                <button 
                    onClick={handleReset}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                    Try Again
                </button>
            </div>
        )}

      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-white/20 text-sm">
        <p>Powered by Google Gemini 3.0</p>
      </footer>
    </div>
  );
};

export default App;