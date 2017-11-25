import { Coordinate, ShipData, ShipType } from './interfaces';
import { shipTypes, gridWidth, gridHeight } from './constants';

interface PlacementData {
  x: number;
  y: number;
  direction: string;
}

export default function generateEnemyShips(): ShipData[] {
  return shipTypes.reduce(generateNewShip, []);
}

function generateNewShip(placements: ShipData[], shipType: ShipType): ShipData[] {
  const allPossiblePlacements = generatePossiblePlacements(shipType.length);
  let randomPosition: Coordinate[] = pickRandomPosition(allPossiblePlacements, shipType.length);
  while (positionOverlaps(placements, randomPosition)) {
    randomPosition = pickRandomPosition(allPossiblePlacements, shipType.length);
  }
  const ship: ShipData = {name: shipType.name, hits: [], cells: randomPosition, sunk: false};
  placements.push(ship);
  return placements;
}

function generatePossiblePlacements(shipLength: number): PlacementData[] {
  const possiblePlacements: PlacementData[] = [];
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth - shipLength; x++) {
      possiblePlacements.push({x, y, direction: 'horizontal'});
    }
  }
  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight - shipLength; y++) {
      possiblePlacements.push({x, y, direction: 'vertical'});
    }
  }
  return possiblePlacements;
}

function pickRandomPosition(possiblePlacements: PlacementData[], shipLength: number): Coordinate[] {
  const r = Math.floor(Math.random() * possiblePlacements.length);
  const randomPlacement = possiblePlacements.splice(r, 1)[0];
  const randomPosition: Coordinate[] = [];
  const offsets = {x: 0, y: 0};
  if (randomPlacement.direction === 'horizontal') {
    offsets.x = 1;
  } else {
    offsets.y = 1;
  }
  for (let i = 0; i < shipLength; i++) {
    const x = randomPlacement.x + offsets.x * i;
    const y = randomPlacement.y + offsets.y * i;
    randomPosition.push({x, y});
  }
  return randomPosition;
}

function positionOverlaps(placements: ShipData[], placement: Coordinate[]): boolean {
  let overlaping: boolean = false;
  placement.forEach(shipPiece => {
    placements.forEach(placedShip => {
      placedShip.cells.forEach(placedShipPiece => {
        if (shipPiece.x === placedShipPiece.x && shipPiece.y === placedShipPiece.y) {
          overlaping = true;
        }
      });
    });
  });
  return overlaping;
}