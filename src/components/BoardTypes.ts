export enum CellState {
  Empty = "EMPTY",
  Ship = "SHIP",
  Hit = "HIT",
  Miss = "MISS",
}

export type Cell = {
  state: CellState;
  shipId: number | null;
};

export interface Ship {
  id: number;
  size: number;
  hits: number;
  orientation: "horizontal" | "vertical";
  x: number;
  y: number;
}

export interface State {
  board: Cell[][];
  ships: Ship[];
  hits: number;
  misses: number;
  sunkShips: number;
  sunkShipIds: number[];
}

export type Action = { type: "RESET_GAME" } | { type: "FIRE"; payload: { x: number; y: number } };
