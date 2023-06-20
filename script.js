const GRID_SIZE = 9;

function createGrid() {
  const sudokuGrid = document.getElementById('sudokuGrid');

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const cell = document.createElement('input');
      cell.className = 'cell';
      cell.id = `cell_${row}_${col}`;
      cell.type = 'text';
      sudokuGrid.appendChild(cell);
    }
  }
}

function getGridValues() {
  const grid = [];

  for (let row = 0; row < GRID_SIZE; row++) {
    grid[row] = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      const cell = document.getElementById(`cell_${row}_${col}`);
      const value = parseInt(cell.value) || 0;
      grid[row][col] = value;
    }
  }

  return grid;
}

function setGridValues(grid) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const cell = document.getElementById(`cell_${row}_${col}`);
      cell.value = grid[row][col];
      if (grid[row][col] > 0) {
        cell.setAttribute('readonly', 'readonly');
        cell.classList.add('solved');
      }
    }
  }
}

function solveSudoku() {
    const grid = getGridValues();
  
    if (solveSudokuRecursive(grid, 0, 0)) {
      setGridValues(grid);
      document.getElementById('solutionMessage').textContent = 'Sudoku solved!';
    } else {
      document.getElementById('solutionMessage').textContent = 'No solution exists.';
    }
  }
  
  function isSafe(grid, row, col, num) {
    // Check if the same number exists in the same row
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[row][x] === num) {
        return false;
      }
    }
  
    // Check if the same number exists in the same column
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[x][col] === num) {
        return false;
      }
    }
  
    // Check if the same number exists in the 3x3 sub-grid
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  function solveSudokuRecursive(grid, row, col) {
    // Check if we have reached the last row and column
    if (row === GRID_SIZE - 1 && col === GRID_SIZE) {
      return true;
    }
  
    // Check if the column value reaches the end, move to the next row and start from the first column
    if (col === GRID_SIZE) {
      row++;
      col = 0;
    }
  
    // Check if the current position of the grid already contains a value greater than 0, move to the next column
    if (grid[row][col] > 0) {
      return solveSudokuRecursive(grid, row, col + 1);
    }
  
    // Iterate from 1 to 9 to fill the grid
    for (let num = 1; num <= GRID_SIZE; num++) {
      if (isSafe(grid, row, col, num)) {
        grid[row][col] = num;
        if (solveSudokuRecursive(grid, row, col + 1)) {
          return true;
        }
        grid[row][col] = 0;
      }
    }
  
    return false;
  }
  
  // Create the Sudoku grid on page load
  createGrid();
  
  // Add event listener to solve button
  const solveButton = document.getElementById('solveButton');
  solveButton.addEventListener('click', solveSudoku);
  
