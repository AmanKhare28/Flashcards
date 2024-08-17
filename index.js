import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

db.connect((err) => {
  if (err) {
    console.log("error connecting to the database: ", err);
  } else {
    console.log("connected to the database");
  }
});

app.get("/flashcards", (req, res) => {
  db.query("SELECT * FROM flashcard", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

app.post("/flashcards", (req, res) => {
  const { question, answer } = req.body;
  db.query(
    "INSERT INTO flashcard (question,answer) VALUES (?,?)",
    [question, answer],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send("flashcard added");
    }
  );
});

app.put("/flashcards/:id", (req, res) => {
  const id = req.params.id;
  const { question, answer } = req.body;
  db.query(
    "UPDATE flashcard SET question = ?, answer = ? WHERE id = ?",
    [question, answer, id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send("flashcard updated");
    }
  );
});

app.delete("/flashcards/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM flashcard WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send("flashcard deleted");
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
