import React from "react";
import { useGameState } from "./useGameState";
import { CellState } from "./Types";
import "./GameBoard.css";

const shipTypes = [
  { name: "carrier", size: 5 },
  { name: "battleship", size: 4 },
  { name: "cruiser", size: 3 },
  { name: "destroyer", size: 2 },
  { name: "submarine", size: 3 },
];

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
                   ${cell.state === CellState.Miss ? "miss" : ""}
                   ${
                     cell.shipId !== null && sunkShipIds.includes(cell.shipId) && cell.state === CellState.Hit
                       ? "sunk"
                       : ""
                   }
                 `}
              >
                {cell.state === CellState.Hit ? "✗" : cell.state === CellState.Miss ? "✕" : ""}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="ship-list">
        {shipTypes.map((ship) => (
          <div key={ship.name} className="ship-item">
            <div className="ship-image-container">
              <img src={`/assets/${ship.name}.png`} alt={ship.name} title={`${ship.name} (Size: ${ship.size})`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
