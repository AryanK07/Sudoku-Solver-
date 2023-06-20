#include <iostream>

using namespace std;

const int GRID_SIZE = 9;

bool isSafe(int grid[GRID_SIZE][GRID_SIZE], int row, int col, int num) {
    // Check if the same number exists in the same row
    for (int x = 0; x < GRID_SIZE; x++) {
        if (grid[row][x] == num) {
            return false;
        }
    }

    // Check if the same number exists in the same column
    for (int x = 0; x < GRID_SIZE; x++) {
        if (grid[x][col] == num) {
            return false;
        }
    }

    // Check if the same number exists in the 3x3 sub-grid
    int startRow = row - row % 3;
    int startCol = col - col % 3;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] == num) {
                return false;
            }
        }
    }

    return true;
}

bool solveSudoku(int grid[GRID_SIZE][GRID_SIZE], int row, int col) {
    // Check if we have reached the last row and column
    if (row == GRID_SIZE - 1 && col == GRID_SIZE) {
        return true;
    }

    // Check if the column value reaches the end, move to the next row and start from the first column
    if (col == GRID_SIZE) {
        row++;
        col = 0;
    }

    // Check if the current position of the grid already contains a value greater than 0, move to the next column
    if (grid[row][col] > 0) {
        return solveSudoku(grid, row, col + 1);
    }

    // Iterate from 1 to 9 to fill the grid
    for (int num = 1; num <= GRID_SIZE; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid, row, col + 1)) {
                return true;
            }
            grid[row][col] = 0;
        }
    }

    return false;
}

void displayGrid(int grid[GRID_SIZE][GRID_SIZE]) {
    cout << "Solved Sudoku:" << endl;
    for (int i = 0; i < GRID_SIZE; i++) {
        for (int j = 0; j < GRID_SIZE; j++) {
            cout << grid[i][j] << " ";
        }
        cout << endl;
    }
}

int main() {
    int grid[GRID_SIZE][GRID_SIZE];
    cout << "Enter the Sudoku grid (0 for empty cells):" << endl;
    for (int i = 0; i < GRID_SIZE; i++) {
        for (int j = 0; j < GRID_SIZE; j++) {
            cin >> grid[i][j];
        }
    }

    if (solveSudoku(grid, 0, 0)) {
        displayGrid(grid);
    } else {
        cout << "No solution exists." << endl;
    }

    return 0;
}
