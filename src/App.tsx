import React, { useState } from "react";
import VideoInput from "./components/VideoInput";
import CaptionForm from "./components/CaptionForm";
import VideoPlayer from "./components/VideoPlayer";
import ErrorBoundary from "./components/ErrorBoundary";

export interface Cue {
  start: number;
  end: number;
  text: string;
}

const App: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [captions, setCaptions] = useState<Cue[]>([]);

  const addCaption = (cue: Cue) => setCaptions((prev) => [...prev, cue]);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gradient-to-b from-black via-grey-500 to-neutral-500">
      <h1 className="text-3xl font-extrabold text-white mb-6">CaptionId</h1>

      <div className="w-full max-w-xl space-y-6">
        <VideoInput onSubmit={setVideoUrl} />
        {videoUrl && (
          <>
            <CaptionForm onAdd={addCaption} />
            <ErrorBoundary>
              <VideoPlayer url={videoUrl} captions={captions} />
            </ErrorBoundary>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
