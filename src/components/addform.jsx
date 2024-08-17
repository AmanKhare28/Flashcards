import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addform = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();

  async function newCard(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    if (question === "" || answer === "") {
      setWarning("Enter a valid value");
    } else {
      try {
        await axios.post("http://localhost:3001/flashcards", {
          question,
          answer,
        });
        navigate("/dashboard"); // Navigate to dashboard on success
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      <form
        className="bg-zinc-800 w-1/2 m-auto p-20 rounded-3xl"
        onSubmit={newCard}
      >
        <h1 className="text-white text-center mb-20 text-3xl font-semibold">
          New Flashcard
        </h1>
        <div>
          <p className="text-xl font-medium text-white">Question :</p>
          <input
            placeholder="Enter new Question"
            className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-full"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <p className="text-xl font-medium text-white">Answer :</p>
          <input
            placeholder="Enter answer"
            className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition w-full"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-zinc-300 px-8 py-4 rounded-xl w-[50%] ml-[25%] mt-10"
        >
          Submit
        </button>
      </form>
      <div className="mt-5 w-1/2 m-auto p-5 rounded-xl text-red-600">
        {warning}
      </div>
    </div>
  );
};

export default Addform;
