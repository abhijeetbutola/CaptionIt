import React, { useState } from "react";
import type { FormEvent } from "react";
import type { Cue } from "../App";

interface CaptionFormProps {
  onAdd: (cue: Cue) => void;
}

const CaptionForm: React.FC<CaptionFormProps> = ({ onAdd }) => {
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const s = parseFloat(start);
    const eT = parseFloat(end);
    if (isNaN(s) || isNaN(eT) || s >= eT) {
      alert("Please enter valid start and end times (start < end).");
      return;
    }
    onAdd({ start: s, end: eT, text });
    setStart("");
    setEnd("");
    setText("");
  };

  return (
    <form
      className="w-full max-w-md mb-4 p-4 bg-white rounded shadow"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold mb-2">Add Caption</h2>
      <div className="flex space-x-2 mb-2">
        <input
          type="number"
          step="0.1"
          className="flex-1 p-2 border rounded"
          placeholder="Start (s)"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.1"
          className="flex-1 p-2 border rounded"
          placeholder="End (s)"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
      </div>
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Caption text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button
        className="px-4 py-2 bg-green-600 text-white rounded"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default CaptionForm;
