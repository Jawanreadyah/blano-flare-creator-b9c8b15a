import React from 'react';

const WebGLFallback = () => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-black/40 backdrop-blur-sm">
      <div className="text-center max-w-md px-6">
        <p className="text-white/80">
          Your browser doesn't support WebGL, which is required for some visual elements. 
          Please try updating your browser or enabling hardware acceleration.
        </p>
      </div>
    </div>
  );
};

export default WebGLFallback;