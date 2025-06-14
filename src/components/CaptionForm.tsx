import React, { useState } from "react";
import type { Cue } from "../App";
import type { FormEvent } from "react";

interface Props {
  onAdd: (cue: Cue) => void;
}
const CaptionForm: React.FC<Props> = ({ onAdd }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [text, setText] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const s = parseFloat(start);
    const eT = parseFloat(end);
    if (isNaN(s) || isNaN(eT) || s >= eT) return;
    onAdd({ start: s, end: eT, text });
    setStart("");
    setEnd("");
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-[rgba(255,255,255,0.2)] backdrop-blur-md border border-white/20 rounded-lg"
    >
      <h2 className="text-lg font-semibold text-white mb-4">Add Caption</h2>
      <div className="flex space-x-2 mb-4">
        <input
          placeholder="Start (s)"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
          className="flex-1 p-2 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none"
        />
        <input
          placeholder="End (s)"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
          className="flex-1 p-2 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none"
        />
      </div>
      <textarea
        placeholder="Caption text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className="w-full p-2 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none mb-4"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-white/30 text-white rounded-lg hover:bg-white/40"
      >
        Add
      </button>
    </form>
  );
};
export default CaptionForm;
