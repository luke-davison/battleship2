export interface CellData {
  click: () => void;
  guess?: number;
  ship?: number;
  x: number;
  y: number;
}

export interface PlayerData {
  grid: CellData[][];
  guesses: Coordinate[];
  ships: Coordinate[][];
}

export interface Coordinate {
  x: number;
  y: number;
}