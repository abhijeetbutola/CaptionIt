import React, { useState } from "react";
import type { FormEvent } from "react";

interface VideoInputProps {
  onSubmit: (url: string) => void;
}

const VideoInput: React.FC<VideoInputProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(url.trim());
    setUrl("");
  };

  return (
    <form className="w-full max-w-md mb-4" onSubmit={handleSubmit}>
      <label className="block text-sm font-medium mb-1">Video URL</label>
      <input
        type="url"
        className="w-full p-2 border rounded mb-2"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/video.mp4 or YouTube URL"
        required
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        type="submit"
      >
        Load Video
      </button>
    </form>
  );
};

export default VideoInput;
