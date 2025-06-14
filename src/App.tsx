import VideoInput from "./components/VideoInput";
import CaptionForm from "./components/CaptionForm";
import VideoPlayer from "./components/VideoPlayer";
import ErrorBoundary from "./components/ErrorBoundary";
import { useState } from "react";

export interface Cue {
  start: number;
  end: number;
  text: string;
}

const App: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [captions, setCaptions] = useState<Cue[]>([]);

  const addCaption = (cue: Cue) => {
    setCaptions((prev) => [...prev, cue]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Video Captioner</h1>
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
  );
};

export default App;
