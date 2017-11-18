import { PlayerData } from './interfaces';

class AppStore {
  enemy: PlayerData;
  player: PlayerData;

  constructor() {
    this.enemy = {grid: [], guesses: [], ships: []};
    this.player = {grid: [], guesses: [], ships: []};
  }
}

export default AppStore;