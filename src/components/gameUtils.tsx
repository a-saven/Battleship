import { Cell, Ship, CellState } from "./BoardTypes";

export const initialBoardSize = 100;

// Generates an empty board
export const generateInitialBoard = (): Cell[][] => {
  return Array.from({ length: initialBoardSize }, () =>
    Array(initialBoardSize).fill({ state: CellState.Empty, shipId: null })
  );
};

// Function to place ships on a board
export const placeShipsOnBoard = (board: Cell[][]): Ship[] => {
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
};

// Tries to place a single ship on the board
export const tryPlaceShip = (size: number, board: Cell[][], shipId: number, newShips: Ship[]): boolean => {
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
};

// Checks if a ship can be placed at a particular location
export const canPlaceShip = (x: number, y: number, size: number, orientation: string, board: Cell[][]): boolean => {
  for (let i = 0; i < size; i++) {
    const xi = orientation === "horizontal" ? x + i : x;
    const yi = orientation === "vertical" ? y + i : y;
    if (xi >= initialBoardSize || yi >= initialBoardSize || board[xi][yi].state === CellState.Ship) {
      return false;
    }
  }
  return true;
};
