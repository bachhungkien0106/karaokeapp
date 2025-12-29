import React from 'react';
import { X, Sparkles, Headphones, Music, Mic2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Content */}
      <div className="relative w-full max-w-2xl bg-[#1a1635] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-2">
            <Mic2 className="text-pink-500 w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">How it Works</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 text-gray-300">
          
          <section>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="text-yellow-400 w-5 h-5" /> The Mission
            </h3>
            <p>
              KaraokeGenius isn't just a song finder; it's a performance coach. We use advanced AI to analyze your vocal preferences and party vibe to create the perfect setlist, complete with singing tips and YouTube links.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <h4 className="text-lg font-bold text-pink-400 mb-2 flex items-center gap-2">
                <Music className="w-4 h-4" /> Quick Filter Mode
              </h4>
              <p className="text-sm">
                Perfect for when you know what you like. Select your genre, difficulty, and mood, and let us find the deep cuts and hits that match your voice.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <h4 className="text-lg font-bold text-purple-400 mb-2 flex items-center gap-2">
                <Headphones className="w-4 h-4" /> DJ Agent Mode
              </h4>
              <p className="text-sm">
                Describe a scenario (e.g., "Singing for my boss who loves 80s rock") and our AI Agent will curate a narrative-driven playlist specifically for that social context.
              </p>
            </div>
          </div>

          <section>
             <h3 className="text-xl font-bold text-white mb-3">Key Features</h3>
             <ul className="space-y-2 list-disc list-inside text-sm">
                <li><strong className="text-white">Smart Search:</strong> We generate specific YouTube queries (Karaoke vs Dance Practice).</li>
                <li><strong className="text-white">Vocal Coaching:</strong> Every song comes with a "Pro Tip" to help you nail the performance.</li>
                <li><strong className="text-white">Storytelling:</strong> Every playlist comes with a custom narrative to set the mood.</li>
             </ul>
          </section>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-white/5 text-center">
          <p className="text-sm text-gray-500">Built with Google Gemini 3.0 Flash Preview</p>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;