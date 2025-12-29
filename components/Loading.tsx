import React from 'react';
import { Music, Mic2, Sparkles } from 'lucide-react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full relative overflow-hidden">
      
      {/* Inline styles for custom orbit animations */}
      <style>{`
        @keyframes orbit-cw {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        @keyframes orbit-ccw {
          0% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
          100% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
        }
        @keyframes float-music {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.5; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }
        .orbit-element-1 { animation: orbit-cw 8s linear infinite; }
        .orbit-element-2 { animation: orbit-ccw 6s linear infinite; }
        .float-note { animation: float-music 3s ease-in-out infinite; }
      `}</style>

      {/* Decorative Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/20 rounded-full blur-[80px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[60px] animate-pulse delay-75"></div>

      {/* Main Animation Container */}
      <div className="relative z-10 mb-12">
        {/* Center Vinyl Record */}
        <div className="relative w-32 h-32 flex items-center justify-center">
           {/* Spinning Record */}
           <div className="absolute inset-0 bg-black rounded-full border-4 border-gray-800 shadow-2xl flex items-center justify-center animate-[spin_3s_linear_infinite]">
              {/* Grooves */}
              <div className="absolute inset-2 border border-gray-800 rounded-full opacity-50"></div>
              <div className="absolute inset-4 border border-gray-800 rounded-full opacity-50"></div>
              <div className="absolute inset-6 border border-gray-800 rounded-full opacity-50"></div>
              {/* Label */}
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-inner">
                 <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
           </div>
           
           {/* Orbiting Icons */}
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="orbit-element-1 absolute text-cyan-400 bg-black/50 p-1.5 rounded-full border border-cyan-500/30 backdrop-blur-sm">
                <Music className="w-5 h-5" />
              </div>
              <div className="orbit-element-2 absolute text-pink-400 bg-black/50 p-1.5 rounded-full border border-pink-500/30 backdrop-blur-sm">
                <Mic2 className="w-4 h-4" />
              </div>
           </div>
        </div>
        
        {/* Floating Sparkles around */}
        <div className="absolute -top-8 -right-8 text-yellow-400 float-note" style={{ animationDelay: '0s' }}>
           <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute -bottom-4 -left-12 text-purple-400 float-note" style={{ animationDelay: '1.5s' }}>
           <Music className="w-5 h-5" />
        </div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 text-center space-y-3 max-w-lg px-4">
        <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 animate-pulse">
          Curating Your Vibe
        </h3>
        <p className="text-gray-400 text-lg font-light">
          Analyzing frequencies, matching tempos, and building your story...
        </p>
      </div>

    </div>
  );
};

export default Loading;