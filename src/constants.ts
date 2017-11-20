export const gridWidth = 11;
export const gridHeight = 9;

export const shipTypes: {name: string, length: number}[] = [
  {name: 'Carrier', length: 5},
  {name: 'Battleship', length: 4},
  {name: 'Cruiser', length: 4},
  {name: 'Submarine', length: 3},
  {name: 'Destroyer', length: 2},
];

const carrierImage = require('./images/carrier.svg');
const battleshipImage = require('./images/battleship.svg');
const cruiserImage = require('./images/cruiser.svg');
const submarineImage = require('./images/submarine.svg');
const destroyerImage = require('./images/destroyer.svg');

export function getShipImage(shipType: string) {
  switch (shipType) {
    case 'Carrier': return carrierImage;
    case 'Battleship': return battleshipImage;
    case 'Cruiser': return cruiserImage;
    case 'Submarine': return submarineImage;
    case 'Destroyer': return destroyerImage;
    default: return '';
  }
}