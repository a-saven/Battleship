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
