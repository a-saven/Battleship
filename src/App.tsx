import React from "react";
import "./App.css";
import { GameBoard } from "./components/GameBoard";

function App() {
  console.log("rendering app");
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>BATTLESHIP</h1>
          <GameBoard />
        </div>
      </header>
    </div>
  );
}

export default App;
