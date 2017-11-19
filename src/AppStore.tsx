import { CellData, PlayerData, ShipData, GuessData } from './interfaces';
import generateEnemyShips from './generateEnemyShips';
import { gridHeight, gridWidth } from './constants';

class AppStore {
  enemy: PlayerData;
  phase: string; // options are 'ready', 'placing', 'guessing', 'waiting', 'reveal'
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
        const cell: CellData = {click, x, y};
        let guesses: GuessData[];
        let ships: ShipData[];
        if (player === 1) {
          guesses = this.player.guesses;
          if (this.phase === 'reveal') {
            ships = this.enemy.ships;
          } else {
            ships = [];
          }
        } else {
          guesses = this.enemy.guesses;
          ships = this.player.ships;
        }
        const guessed = guesses.find(guess => guess.cell.x === x && guess.cell.y === y);
        if (guessed) {
          cell.guess = guessed.result;
        }
        const ship = ships.find(fullShip => {
          return !!fullShip.cells.find(shipCell => shipCell.x === x && shipCell.y === y);
        });
        if (ship) {
          cell.ship = ship.name;
        }
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