import generateEnemyShips from './generateEnemyShips';
import { Coordinate } from './interfaces';

const gridHeight = 9;
const gridWidth = 11;
const shipLengths = [5, 4, 3, 3, 2];

// these tests are run multiple times as the function generates random results
// which may cause a test to pass sometimes and fail others
const numberOfTimesToRun = 10;

const results: Coordinate[][][] = [];
for (let i = 0; i < numberOfTimesToRun; i++) {
  results.push(generateEnemyShips(gridWidth, gridHeight, shipLengths));
}

it('returns an array', () => {
  results.forEach(result => expect(Array.isArray(result)).toBe(true));
});

it('array contains correct number of ships', () => {
  results.forEach(result => expect(result.length).toBe(shipLengths.length));
});

it('ships are of correct length', () => {
  results.forEach(result => result.forEach((ship, i) => expect(ship.length).toBe(shipLengths[i])));
});

it('ships are of correct format', () => {
  results.forEach(result => {
    result.forEach(ship => {
      ship.forEach(cell => {
        expect(Object.keys(cell)).toContain('x');
        expect(Object.keys(cell)).toContain('y');
      });
    });
  });
});

it('ships are not placed above the area', () => {
  results.forEach(result => {
    result.forEach(ship => {
      ship.forEach(cell => {
        expect(cell.y).toBeGreaterThanOrEqual(0);
      });
    });
  });
});

it('ships are not placed below the area', () => {
  results.forEach(result => {
    result.forEach(ship => {
      ship.forEach(cell => {
        expect(cell.y).toBeLessThan(gridHeight);
      });
    });
  });
});

it('ships are not placed above the area', () => {
  results.forEach(result => {
    result.forEach(ship => {
      ship.forEach(cell => {
        expect(cell.x).toBeGreaterThanOrEqual(0);
      });
    });
  });
});

it('ships are not placed right of the area', () => {
  results.forEach(result => {
    result.forEach(ship => {
      ship.forEach(cell => {
        expect(cell.x).toBeLessThan(gridWidth);
      });
    });
  });
});

it('ships do not overlap', () => {
  results.forEach(result => {
    const cells: Coordinate[] = [];
    result.forEach(ship => {
      ship.forEach(cell => {
        cells.push(cell);
      });
    });
    while (cells.length) {
      const cell = cells.pop();
      cells.forEach(otherCell => expect(cell).not.toEqual(otherCell));
    }
  });
});
