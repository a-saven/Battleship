import React from "react";
import { useGameState } from "./useGameState";
import { CellState } from "./Types";
import "./GameBoard.css";

export const GameBoard: React.FC = () => {
  const { board, fire, hits, misses, sunkShips, resetGame, ships, sunkShipIds } = useGameState();

  const score = ((hits / (hits + misses || 1)) * 100).toFixed();

  return (
    <div className="board-container">
      <div className="status-bar">
        <span>
          Ships Sunk: {sunkShips} / {ships.length}
        </span>
        {sunkShips === ships.length && (
          <div className="victory">
            <span>Victory!</span>
            <button className="play-again-button" onClick={resetGame}>
              Play Again
            </button>
          </div>
        )}
        <div>
          <span>Hit Rating: {score}%</span>
        </div>
      </div>
      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="board-row">
            {row.map((cell, j) => (
              <button
                key={j}
                onClick={() => fire(i, j)}
                className={`
            board-cell 
            ${cell.state === CellState.Hit ? "hit" : ""} 
            ${cell.shipId !== null && sunkShipIds.includes(cell.shipId) && cell.state === CellState.Hit ? "sunk" : ""}
            `}
              >
                {cell.state === CellState.Hit ? "X" : cell.state === CellState.Miss ? "O" : "-"}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
