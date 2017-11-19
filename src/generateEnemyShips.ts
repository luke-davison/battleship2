import { Coordinate, ShipData } from './interfaces';
import { shipTypes, gridWidth, gridHeight } from './constants';

function generateEnemyShips(): ShipData[] {
  const placements: ShipData[] = [];
  shipTypes.forEach(shipType => {
    let ship: ShipData = {name: shipType.name, hits: [], cells: [], sunk: false};
    const possiblePlacements: {x: number, y: number, direction: string}[] = [];
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth - shipType.length; x++) {
        possiblePlacements.push({x, y, direction: 'horizontal'});
      }
    }
    for (let x = 0; x < gridWidth; x++) {
      for (let y = 0; y < gridHeight - shipType.length; y++) {
        possiblePlacements.push({x, y, direction: 'vertical'});
      }
    }
    while (!ship.cells.length) {
      const r = Math.floor(Math.random() * possiblePlacements.length);
      const randomPlacement: {x: number, y: number, direction: string} = possiblePlacements.splice(r, 1)[0];
      const possiblePlacement: Coordinate[] = [];
      const offsets = {x: 0, y: 0};
      if (randomPlacement.direction === 'horizontal') {
        offsets.x = 1;
      } else {
        offsets.y = 1;
      }
      for (let i = 0; i < shipType.length; i++) {
        const x = randomPlacement.x + offsets.x * i;
        const y = randomPlacement.y + offsets.y * i;
        possiblePlacement.push({x, y});
      }
      let overlap: boolean = false;
      possiblePlacement.forEach(shipPiece => {
        placements.forEach(placedShip => {
          placedShip.cells.forEach(placedShipPiece => {
            if (shipPiece.x === placedShipPiece.x && shipPiece.y === placedShipPiece.y) {
              overlap = true;
            }
          });
        });
      });
      if (!overlap) {
        ship.cells = possiblePlacement;
      }
    }
    placements.push(ship);
  });
  
  return placements;
}

export default generateEnemyShips;