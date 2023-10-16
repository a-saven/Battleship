import { useEffect, useReducer, Reducer } from "react";
import { CellState, Cell, Ship, State, Action } from "./BoardTypes";
import { generateInitialBoard, placeShipsOnBoard } from "./gameUtils";

const initialState: State = {
  board: generateInitialBoard(),
  ships: [],
  hits: 0,
  misses: 0,
  sunkShips: 0,
  sunkShipIds: [],
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "RESET_GAME":
      const newBoard = generateInitialBoard();
      const newShips = placeShipsOnBoard(newBoard);
      return { ...initialState, board: newBoard, ships: newShips };
    case "FIRE":
      return handleFire(state, action.payload);
    default:
      return state;
  }
}

function handleFire(state: State, { x, y }: { x: number; y: number }): State {
  const { board, hits, misses, sunkShips, sunkShipIds } = state;
  const newBoard = JSON.parse(JSON.stringify(board)); // Deep clone
  const cell = newBoard[x][y];

  if (cell.state === CellState.Hit || cell.state === CellState.Miss) return state;

  let newHits = hits,
    newMisses = misses,
    newSunkShips = sunkShips,
    newSunkShipIds = [...sunkShipIds];

  if (cell.state === CellState.Ship) {
    newHits++;
    cell.state = CellState.Hit;
  } else {
    newMisses++;
    cell.state = CellState.Miss;
  }

  if (cell.shipId !== null && checkIfSunk(cell.shipId, newBoard)) {
    newSunkShips++;
    newSunkShipIds.push(cell.shipId);
  }

  return {
    board: newBoard,
    ships: state.ships,
    hits: newHits,
    misses: newMisses,
    sunkShips: newSunkShips,
    sunkShipIds: newSunkShipIds,
  };
}

function checkIfSunk(shipId: number, board: Cell[][]): boolean {
  return board
    .flat()
    .filter((cell) => cell.shipId === shipId)
    .every((cell) => cell.state === CellState.Hit);
}

export const useGameState = () => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initialState);
  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  const fire = (x: number, y: number) => dispatch({ type: "FIRE", payload: { x, y } });

  useEffect(() => {
    dispatch({ type: "RESET_GAME" });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ...state, fire, resetGame };
};
