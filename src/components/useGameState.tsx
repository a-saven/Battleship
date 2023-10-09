import { useState, useEffect } from "react";
import { CellState, Cell, Ship } from "./Types";

const initialBoardSize = 10;

export const useGameState = () => {
  const initialBoard = generateInitialBoard();
  const [board, setBoard] = useState(initialBoard);
  const [ships, setShips] = useState<Ship[]>([]);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [sunkShips, setSunkShips] = useState(0);
  const [sunkShipIds, setSunkShipIds] = useState<number[]>([]);

  // Resets the game state
  const resetGame = () => {
    setHits(0);
    setMisses(0);
    setSunkShips(0);
    setSunkShipIds([]); // Reset sunk ship IDs
    placeShips(); // Make sure to reset ships and board
  };

  // Generates an empty board
  function generateInitialBoard(): Cell[][] {
    return Array.from({ length: initialBoardSize }, () =>
      Array(initialBoardSize).fill({ state: CellState.Empty, shipId: null })
    );
  }

  // Places ships on the board
  const placeShips = () => {
    let newBoard = [...initialBoard];
    let newShips = placeShipsOnBoard(newBoard);
    setBoard(newBoard);
    setShips(newShips);
  };

  // Function to place ships on a board
  function placeShipsOnBoard(board: Cell[][]): Ship[] {
    let shipId = 0;
    const shipSizes = Array(5)
      .fill(null)
      .map(() => Math.floor(Math.random() * 4) + 2);
    const newShips: Ship[] = [];

    for (let size of shipSizes) {
      let placed = false;
      while (!placed) {
        placed = tryPlaceShip(size, board, shipId, newShips);
      }
      shipId++;
    }
    return newShips;
  }

  // Tries to place a single ship on the board
  function tryPlaceShip(size: number, board: Cell[][], shipId: number, newShips: Ship[]): boolean {
    const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
    const x = Math.floor(Math.random() * initialBoardSize);
    const y = Math.floor(Math.random() * initialBoardSize);

    if (canPlaceShip(x, y, size, orientation, board)) {
      // Place the ship and update the board
      for (let i = 0; i < size; i++) {
        const xi = orientation === "horizontal" ? x + i : x;
        const yi = orientation === "vertical" ? y + i : y;
        board[xi][yi] = { state: CellState.Ship, shipId: shipId };
      }
      newShips.push({ id: shipId, size, orientation, x, y, hits: 0 });
      return true;
    }
    return false;
  }

  // Checks if a ship can be placed at a particular location
  function canPlaceShip(x: number, y: number, size: number, orientation: string, board: Cell[][]): boolean {
    for (let i = 0; i < size; i++) {
      const xi = orientation === "horizontal" ? x + i : x;
      const yi = orientation === "vertical" ? y + i : y;
      if (xi >= initialBoardSize || yi >= initialBoardSize || board[xi][yi].state === CellState.Ship) {
        return false;
      }
    }
    return true;
  }

  // Fires at a cell
  const fire = (x: number, y: number) => {
    const newBoard = JSON.parse(JSON.stringify(board)); // Deep clone
    const cell = newBoard[x][y];
    if (cell.state !== CellState.Hit && cell.state !== CellState.Miss) {
      // Check already hit or missed cells
      handleStrike(cell);
      setBoard(newBoard);
      if (cell.shipId !== null) {
        checkIfSunk(cell.shipId, newBoard);
      }
    }
  };

  // Checks if a ship has been sunk
  const checkIfSunk = (shipId: number, board: Cell[][]) => {
    const shipCells = board.flat().filter((cell) => cell.shipId === shipId);
    if (shipCells.every((cell) => cell.state === CellState.Hit)) {
      setSunkShips((prev) => prev + 1);
      setSunkShipIds((prev) => [...prev, shipId]);
    }
  };

  // Handle a strike at a particular cell
  const handleStrike = (cell: Cell) => {
    if (cell.state === CellState.Ship) {
      setHits(hits + 1);
      cell.state = CellState.Hit;
    } else {
      setMisses(misses + 1);
      cell.state = CellState.Miss;
    }
  };

  useEffect(() => {
    placeShips();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { board, fire, hits, misses, sunkShips, resetGame, ships, sunkShipIds };
};
