import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const AudioPlayer = ({ isMuted, setIsMuted }: AudioPlayerProps) => {
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-8 right-8 z-50 p-3 bg-black/80 backdrop-blur-sm border border-white/10 rounded-full hover:bg-black/90 transition-all group"
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
      ) : (
        <Volume2 className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
      )}
    </button>
  );
};

export default AudioPlayer;