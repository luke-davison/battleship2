import * as React from 'react';

import AppStore from '../AppStore';
import Grid from './Grid';
import './App.css';

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
