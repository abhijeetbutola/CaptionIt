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
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-[rgba(255,255,255,0.2)] backdrop-blur-md border border-white/20 rounded-lg"
    >
      <label className="block text-white font-semibold mb-2">Video URL</label>
      <div className="flex space-x-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder="https://..."
          className="flex-1 p-2 bg-white/20 text-white placeholder-white/70 rounded-lg border border-white/30 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white/30 text-white rounded-lg hover:bg-white/40"
        >
          Load
        </button>
      </div>
    </form>
  );
};
export default VideoInput;
