import { generateRandomSudoku } from '../helper/map';
import { solve } from '../helper/solver';
import { BOARD_SIZE } from '../helper/constants';

it('should generate random sudoku in the specified board size', () => {
    const randomSudoku = generateRandomSudoku();
    expect(randomSudoku).not.toBeNull();
    expect(randomSudoku.length).toBe(BOARD_SIZE);
    for (let row of randomSudoku) {
        expect(row.length).toBe(BOARD_SIZE);
    }
});

it('should generate solvable random sudoku in all difficulty levels', () => {
    const randomEasySudoku = generateRandomSudoku('Easy');
    const randomMediumSudoku = generateRandomSudoku('Medium');
    const randomHardSudoku = generateRandomSudoku('Hard');
    const randomExpertSudoku = generateRandomSudoku('Expert');

    expect(solve(randomEasySudoku)).toBeTruthy();
    expect(solve(randomMediumSudoku)).toBeTruthy();
    expect(solve(randomHardSudoku)).toBeTruthy();
    expect(solve(randomExpertSudoku)).toBeTruthy();
});
