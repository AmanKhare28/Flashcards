import React, { useState } from "react";
import "../Flashcard.css"; // Ensure to create this CSS file for flip effect

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`relative w-64 h-48 perspective-1000`} onClick={handleFlip}>
      <div
        className={`absolute w-full h-full transition-transform duration-300 ${
          isFlipped ? "rotate-y-180" : ""
        } transform-style-preserve-3d`}
      >
        <div className="absolute w-full h-full bg-white shadow-lg rounded-lg backface-hidden flex items-center justify-center p-4 font-mont">
          <div className="text-lg font-bold">{question}</div>
        </div>
        <div className="absolute w-full h-full bg-zinc-700 text-white shadow-lg rounded-lg rotate-y-180 backface-hidden flex items-center justify-center p-4">
          <div className="text-md">{answer}</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
