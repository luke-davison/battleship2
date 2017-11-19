import * as React from 'react';

import AppStore from '../AppStore';
import Grid from './Grid';
import './App.css';

const gridHeight = 9;
const gridWidth = 11;
const shipLengths = [5, 4, 3, 3, 2];

const appStore = new AppStore();

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="Enemy">
          <div className="Enemy-Grid">
            <Grid grid={appStore.enemy.grid}/>
          </div>
        </div>
        <div className="Player">
          <div className="Player-Grid">
            <Grid grid={appStore.player.grid}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
