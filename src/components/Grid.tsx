import * as React from 'react';

import { CellData } from '../interfaces';
import './Grid.css';

class Grid extends React.Component<{grid: CellData[][]}, {} > {
  render() {
    return (
      <div className="Grid">
        <table className="Grid-table">
          <tbody>
            <tr className="col-numbers">
              <td />
              {this.props.grid[0].map((cell, columnID) => (
                <td className="col-number">
                  {String.fromCharCode(97 + columnID)}
                </td>
              ))}
            </tr>
            {this.props.grid.map((row, rowId) => (
              <tr key={rowId}>
                <td className="row-number">
                  {rowId + 1}
                </td>
                {row.map(cell => (
                  <td className="Cell" key={cell.x} onClick={cell.click}>
                    {cell.ship && <div className="Ship" />}
                    {cell.guess && <div className="Guess" />}
                  </td>
                ))}
              </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Grid;
