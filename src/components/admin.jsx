import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Admin() {
  const [cardList, setCardList] = useState([]);

  async function fetchCards() {
    try {
      const response = await axios.get("http://localhost:3001/flashcards");
      setCardList(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3001/flashcards/${id}`);
      fetchCards();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Link to="/addform" className="ml-24">
        <button class="bg-neutral-950 text-neutral-400 border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
          <span class="bg-neutral-400 shadow-neutral-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          Add new flashcard
        </button>
      </Link>
      <ul className="flex flex-col gap-4 mt-20">
        {cardList.map((card) => (
          <li
            key={card.id}
            className="bg-zinc-800 w-1/2 m-auto flex justify-between hover:border border-white text-zinc-200 p-7 rounded-xl"
          >
            <div>
              <strong>Question :</strong>
              <p>{card.question}</p>
              <strong>Answer :</strong>
              <p>{card.answer}</p>
            </div>
            <div>
              <span
                className="material-symbols-outlined text-zinc-400 hover:text-zinc-200 text-[30px] cursor-pointer"
                onClick={() => handleDelete(card.id)}
              >
                delete
              </span>
              <Link to={`/editform/${card.id}`}>
                <span className="material-symbols-outlined text-zinc-400 hover:text-zinc-200 text-[30px] cursor-pointer">
                  edit
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
