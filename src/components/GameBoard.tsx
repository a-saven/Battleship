import React, { useState, useEffect, useRef } from "react";
import { useGameState } from "./useOptimalState";
import { VariableSizeGrid as Grid } from "react-window";
import BoardCell from "./BoardCell";
import StatusBar from "./StatusBar";
import "./GameBoard.css";

export const GameBoard: React.FC = () => {
  const { board, fire, hits, misses, sunkShips, resetGame, ships, sunkShipIds } = useGameState();
  const [focusedRow, setFocusedRow] = useState(0);
  const [focusedCol, setFocusedCol] = useState(0);

  useEffect(() => {
    const cell = document.querySelector(
      `.board-row:nth-child(${focusedRow + 1}) .board-cell:nth-child(${focusedCol + 1})`
    ) as HTMLButtonElement;
    cell?.focus();
  }, [focusedRow, focusedCol]);

  const handleKeyPress = (event: React.KeyboardEvent, i: number, j: number) => {
    switch (event.key) {
      case "ArrowUp":
        if (i > 0) setFocusedRow(i - 1);
        break;
      case "ArrowDown":
        if (i < board.length - 1) setFocusedRow(i + 1);
        break;
      case "ArrowLeft":
        if (j > 0) setFocusedCol(j - 1);
        break;
      case "ArrowRight":
        if (j < board[i].length - 1) setFocusedCol(j + 1);
        break;
      default:
        break;
    }
  };

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const cell = board[rowIndex][columnIndex];
    return (
      <div style={style}>
        <BoardCell
          cell={cell.state}
          onClick={() => fire(rowIndex, columnIndex)}
          onKeyDown={(e) => handleKeyPress(e, rowIndex, columnIndex)}
          tabIndex={rowIndex === focusedRow && columnIndex === focusedCol ? 0 : -1}
        />
      </div>
    );
  };

  const score = ((hits / (hits + misses || 1)) * 100).toFixed();

  const fixedSize = 40; // Fixed size for each cell

  return (
    <div className="board-container">
      <StatusBar sunkShips={sunkShips} totalShips={ships.length} score={score} resetGame={resetGame} />
      <Grid
        columnCount={1000} // Set to a high value for 'infinite' scrolling
        rowCount={1000} // Set to a high value for 'infinite' scrolling
        columnWidth={() => fixedSize}
        rowHeight={() => fixedSize}
        width={fixedSize * 10} // Only show 10 columns
        height={fixedSize * 10} // Only show 10 rows
      >
        {Cell}
      </Grid>
    </div>
  );
};
