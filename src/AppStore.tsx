import { PlayerData } from './interfaces';
import generateEnemyShips from './generateEnemyShips';

const gridHeight = 9;
const gridWidth = 11;
const shipLengths = [5, 4, 3, 3, 2];

class AppStore {
  enemy: PlayerData;
  height: number;
  phase: string; // options are 'ready', 'placing', 'guessing', 'waiting'
  player: PlayerData;
  width: number;

  constructor() {
    this.enemy = {grid: [], guesses: [], ships: generateEnemyShips(gridWidth, gridHeight, shipLengths)};
    this.player = {grid: [], guesses: [], ships: []};
    this.phase = 'ready';
  }
}

export default AppStore;