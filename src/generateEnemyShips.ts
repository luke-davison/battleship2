import { Coordinate } from './interfaces';

function generateEnemyShips(width: number, height: number, ships: number[]): Coordinate[][] {
  const placements: Coordinate[][] = [];
  ships.forEach(shipLength => {
    let ship: Coordinate[] = [];
    const possiblePlacements: {x: number, y: number, direction: string}[] = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width - shipLength; x++) {
        possiblePlacements.push({x, y, direction: 'horizontal'});
      }
    }
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height - shipLength; y++) {
        possiblePlacements.push({x, y, direction: 'vertical'});
      }
    }
    while (!ship) {
      const r = Math.floor(Math.random() * possiblePlacements.length);
      const randomPlacement: {x: number, y: number, direction: string} = possiblePlacements.splice(r, 1)[0];
      const possiblePlacement: Coordinate[] = [];
      const offsets = {x: 0, y: 0};
      if (randomPlacement.direction === 'horizontal') {
        offsets.x = 1;
      } else {
        offsets.y = 1;
      }
      for (let i = 0; i < shipLength; i++) {
        const x = randomPlacement.x + offsets.x * i;
        const y = randomPlacement.y + offsets.y * i;
        possiblePlacement.push({x, y});
      }
      let overlap: boolean = false;
      possiblePlacement.forEach(shipPiece => {
        placements.forEach(placedShip => {
          placedShip.forEach(placedShipPiece => {
            if (shipPiece.x === placedShipPiece.x && shipPiece.y === placedShipPiece.y) {
              overlap = true;
            }
          });
        });
      });
      if (!overlap) {
        ship = possiblePlacement;
      }
    }
    placements.push(ship)
  });
  
  return placements;
}

export default generateEnemyShips;