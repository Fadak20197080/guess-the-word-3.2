import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState, useEffect } from "react";

function App() {
  // const [currWord, setCurrentWord] = useState("rocket");
  const [currWord, setCurrentWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guess, setGuess] = useState("");
  const [remainingGuesses, setRemainingGuesses] = useState(10);
  const [gameStatus, setGameStatus] = useState("playing");

  const generateWordDisplay = () => {
    const wordDisplay = [];
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.join(" ");
  };

  useEffect(() => {
    const allLettersGuessed = currWord
      .split("")
      .every((letter) => guessedLetters.includes(letter));

    if (allLettersGuessed) {
      setGameStatus("won");
    } else if (remainingGuesses <= 0) {
      setGameStatus("lost");
    }
  }, [guessedLetters, remainingGuesses, currWord]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const letter = guess.toLowerCase();

    if (!letter || guessedLetters.includes(letter) || gameStatus !== "playing")
      return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!currWord.includes(letter)) {
      setRemainingGuesses((prev) => prev - 1);
    }

    setGuess("");
  };

  const handlePlayAgain = () => {
    setGuessedLetters([]);
    setRemainingGuesses(10);
    setCurrentWord(getRandomWord());
    setGameStatus("playing");
  };

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      <div className="card">
        <h1> Guess The Word</h1>

        <h3>Word Display</h3>
        <p style={{ fontSize: "24px", letterSpacing: "10px" }}>
          {generateWordDisplay()}
        </p>

        <h3>Guessed Letters</h3>
        <p>{guessedLetters.length > 0 ? guessedLetters.join(", ") : "-"}</p>

        <h3>Remaining Guesses: {remainingGuesses}</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={1}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={gameStatus !== "playing"}
          />
          <button type="submit" disabled={gameStatus !== "playing"}>
            Guess
          </button>
        </form>

        {gameStatus === "won" && <h2> You won! Well done!</h2>}
        {gameStatus === "lost" && (
          <>
            <h2>You lost! The word was: {currWord}</h2>
          </>
        )}

        {gameStatus !== "playing" && (
          <button onClick={handlePlayAgain}>Play Again</button>
        )}
      </div>
    </>
  );
}

export default App;
