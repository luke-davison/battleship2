import { CellData, PlayerData } from './interfaces';
import generateEnemyShips from './generateEnemyShips';

const gridHeight = 9;
const gridWidth = 11;
const shipLengths = [5, 4, 3, 3, 2];

class AppStore {
  enemy: PlayerData;
  height: number = gridHeight;
  phase: string; // options are 'ready', 'placing', 'guessing', 'waiting'
  player: PlayerData;
  width: number = gridWidth;

  constructor() {
    const enemyShips = generateEnemyShips(gridWidth, gridHeight, shipLengths);
    this.enemy = {grid: [], guesses: [], ships: enemyShips};
    this.player = {grid: [], guesses: [], ships: []};
    this.phase = 'ready';

    this.generateGrid = this.generateGrid.bind(this);
    this.clickCell = this.clickCell.bind(this);
  }

  generateGrid(player: number): CellData[][] {
    const grid: CellData[][] = [];
    for (let y = 0; y < this.height; y++) {
      grid.push([]);
      for (let x = 0; x < this.width; x++) {
        const click = () => this.clickCell(player, x, y);
        const cell = {click, x, y};
        grid[grid.length - 1].push(cell);
      }
    }
    return grid;
  }

  clickCell(player: number, x: number, y: number) {
    this.phase = 'clicked';
  }
}

export default AppStore;