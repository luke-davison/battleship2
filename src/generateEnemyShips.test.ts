import generateEnemyShips from './generateEnemyShips';
import { Coordinate, ShipData } from './interfaces';
import { gridHeight, gridWidth, shipTypes } from './constants';

// these tests are run multiple times as the function generates random results
// which may cause a test to pass sometimes and fail others
const numberOfTimesToRun = 100;

const results: ShipData[][] = [];
for (let i = 0; i < numberOfTimesToRun; i++) {
  results.push(generateEnemyShips());
}

it('returns an array', () => {
  results.forEach(result => expect(Array.isArray(result)).toBe(true));
});

it('array contains correct number of ships', () => {
  results.forEach(result => expect(result.length).toBe(shipTypes.length));
});

it('ships are of correct length', () => {
  results.forEach(result => result.forEach((ship, i) => expect(ship.cells.length).toBe(shipTypes[i].length)));
});

it('ships are of correct format', () => {
  results.forEach(result => {
    result.forEach(ship => {
      ship.cells.forEach(cell => {
        expect(Object.keys(cell)).toContain('x');
        expect(Object.keys(cell)).toContain('y');
      });
    });
  });
});

it('ships are not placed above the area', () => {
  results.forEach(result => {
    result.forEach(ship => {
      ship.cells.forEach(cell => {
        expect(cell.y).toBeGreaterThanOrEqual(0);
      });
    });
  });
});

it('ships are not placed below the area', () => {
  results.forEach(result => {
    result.forEach(ship => {
      ship.cells.forEach(cell => {
        expect(cell.y).toBeLessThan(gridHeight);
      });
    });
  });
});

it('ships are not placed above the area', () => {
  results.forEach(result => {
    result.forEach(ship => {
      ship.cells.forEach(cell => {
        expect(cell.x).toBeGreaterThanOrEqual(0);
      });
    });
  });
});

it('ships are not placed right of the area', () => {
  results.forEach(result => {
    result.forEach(ship => {
      ship.cells.forEach(cell => {
        expect(cell.x).toBeLessThan(gridWidth);
      });
    });
  });
});

it('ships do not overlap', () => {
  results.forEach(result => {
    const cells: Coordinate[] = [];
    result.forEach(ship => {
      ship.cells.forEach(cell => {
        cells.push(cell);
      });
    });
    while (cells.length) {
      const cell = cells.pop();
      cells.forEach(otherCell => expect(cell).not.toEqual(otherCell));
    }
  });
});
