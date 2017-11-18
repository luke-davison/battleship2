import * as React from 'react';

import { CellData } from '../interfaces';
import './Grid.css';

class Grid extends React.Component<{grid: CellData[][]}, {} > {
  render() {
    return (
      <div className="Grid">
        <table>
          {this.props.grid.map((row, rowId) => (
            <tr key={rowId}>
              {row.map(cell => (
                <td className="Cell" key={cell.x} onClick={cell.click}>
                  {cell.ship && <div className="Ship" />}
                  {cell.guess && <div className="Guess" />}
                </td>
              ))}
            </tr>
            )
          )}
        </table>
      </div>
    );
  }
}

export default Grid;
