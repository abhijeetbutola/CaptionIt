// src/components/VideoPlayer.tsx
import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import type { Cue } from "../App";

interface Props {
  url: string;
  captions: Cue[];
}
const VideoPlayer: React.FC<Props> = ({ url, captions }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [vttUrl, setVttUrl] = useState<string | null>(null);
  const isYouTube = /youtu(be\.com|\.be)/.test(url);

  // Generate WebVTT blob from captions
  useEffect(() => {
    if (vttUrl) {
      URL.revokeObjectURL(vttUrl);
      setVttUrl(null);
    }
    if (captions.length) {
      const formatTime = (sec: number): string => {
        const hours = Math.floor(sec / 3600)
          .toString()
          .padStart(2, "0");
        const mins = Math.floor((sec % 3600) / 60)
          .toString()
          .padStart(2, "0");
        const secs = (sec % 60).toFixed(3).padStart(6, "0");
        return `${hours}:${mins}:${secs}`;
      };
      const vtt =
        "WEBVTT" +
        captions
          .map(
            (c, i) => `${i + 1}
${formatTime(c.start)} --> ${formatTime(c.end)}
${c.text}`
          )
          .join("");
      const blob = new Blob([vtt], { type: "text/vtt" });
      setVttUrl(URL.createObjectURL(blob));
    }
    return () => {
      if (vttUrl) URL.revokeObjectURL(vttUrl);
    };
  }, [captions, vttUrl]);

  const onTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
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
          config={{
            file: {
              attributes: { crossOrigin: "anonymous" },
              tracks: vttUrl
                ? [
                    {
                      kind: "captions",
                      src: vttUrl,
                      srcLang: "en",
                      label: "English",
                      default: true,
                    },
                  ]
                : [],
            },
          }}
        />
      ) : (
        <video
          ref={videoRef}
          controls
          className="w-full h-full object-contain"
          src={url}
          crossOrigin="anonymous"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={onTimeUpdate}
        >
          {vttUrl && (
            <track
              kind="captions"
              src={vttUrl}
              srcLang="en"
              label="English"
              default
            />
          )}
        </video>
      )}

      {isPlaying &&
        captions.find(
          (c) => currentTime >= c.start && currentTime <= c.end
        ) && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/70 text-black p-2 rounded-lg">
            {
              captions.find(
                (c) => currentTime >= c.start && currentTime <= c.end
              )?.text
            }
          </div>
        )}
    </div>
  );
};

export default VideoPlayer;
