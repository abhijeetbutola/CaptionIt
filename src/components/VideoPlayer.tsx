import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import type { Cue } from "../App";

interface VideoPlayerProps {
  url: string;
  captions: Cue[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, captions }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const isYouTube = /youtu(be\.com|\.be)/.test(url);

  const activeText = (): string => {
    const cue = captions.find(
      ({ start, end }) => currentTime >= start && currentTime <= end
    );
    return cue ? cue.text : "";
  };

  return (
    <div className="w-full max-w-lg aspect-video relative">
      {isYouTube ? (
        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="100%"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
        />
      ) : (
        <video
          ref={videoRef}
          controls
          className="w-full h-full object-contain rounded shadow"
          src={url}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onError={() => {
            throw new Error("Failed to load video. Please check the URL.");
          }}
        />
      )}

      {isPlaying && activeText() && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white p-2 rounded max-w-full">
          {activeText()}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
