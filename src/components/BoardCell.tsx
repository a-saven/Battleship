import React from "react";
import { CellState } from "./BoardTypes";

interface BoardCellProps {
  cell: CellState;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  tabIndex: number;
}

const BoardCell: React.FC<BoardCellProps> = ({ cell, onClick, onKeyDown, tabIndex }) => (
  <button
    tabIndex={tabIndex}
    onKeyDown={onKeyDown}
    onClick={onClick}
    className={`board-cell ${cell === CellState.Hit ? "hit" : ""} ${cell === CellState.Miss ? "miss" : ""}`}
  >
    {cell === CellState.Hit ? "✗" : cell === CellState.Miss ? "✕" : ""}
  </button>
);

export default BoardCell;
