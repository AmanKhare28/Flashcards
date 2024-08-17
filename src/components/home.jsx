import axios from "axios";
import { useEffect, useState } from "react";
import Flashcard from "../components/flashcard.jsx"; // Ensure the correct path and file extension

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    try {
      const response = await axios.get("http://localhost:3001/flashcards");
      setFlashcards(response.data);
    } catch (err) {
      setError("Failed to load flashcards. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  if (flashcards.length === 0) {
    return (
      <div className="text-center p-4 text-white">No flashcards available</div>
    );
  }

  const prev = "<";
  const next = ">";

  return (
    <div className="flex justify-around items-center p-4 mt-72">
      <button
        onClick={handlePrevious}
        className="bg-zinc-600 text-zinc-900 py-2 px-4 rounded-full text-3xl font-black hover:bg-zinc-500 cursor-pointe"
        disabled={currentIndex == 0}
      >
        {prev}
      </button>
      <Flashcard
        question={flashcards[currentIndex].question}
        answer={flashcards[currentIndex].answer}
      />
      <button
        onClick={handleNext}
        className="bg-zinc-600 text-zinc-900 py-2 px-4 rounded-full text-3xl font-black hover:bg-zinc-500 cursor-pointer"
        disabled={currentIndex == flashcards.length - 1}
      >
        {next}
      </button>
    </div>
  );
}

export default Home;
