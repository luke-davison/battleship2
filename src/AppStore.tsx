import { CellData, PlayerData } from './interfaces';
import generateEnemyShips from './generateEnemyShips';
import { gridHeight, gridWidth } from './constants';

class AppStore {
  enemy: PlayerData;
  phase: string; // options are 'ready', 'placing', 'guessing', 'waiting'
  player: PlayerData;

  constructor() {
    const enemyShips = generateEnemyShips();
    this.enemy = {grid: [], guesses: [], ships: enemyShips};
    this.player = {grid: [], guesses: [], ships: []};
    this.phase = 'ready';

    this.generateGrid = this.generateGrid.bind(this);
    this.clickCell = this.clickCell.bind(this);
  }

  generateGrid(player: number): CellData[][] {
    const grid: CellData[][] = [];
    for (let y = 0; y < gridHeight; y++) {
      grid.push([]);
      for (let x = 0; x < gridWidth; x++) {
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