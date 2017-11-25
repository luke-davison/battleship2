export interface CellData {
  click: () => void;
  guess?: string;
  ship?: string;
  x: number;
  y: number;
}

export interface PlayerData {
  grid: CellData[][];
  guesses: GuessData[];
  ships: ShipData[];
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface ShipData {
  cells: Coordinate[];
  hits: Coordinate[];
  name: string;
  sunk: boolean;
}

export interface GuessData {
  cell: Coordinate;
  result: string;
}

export interface ShipType {
  name: string;
  length: number;
}