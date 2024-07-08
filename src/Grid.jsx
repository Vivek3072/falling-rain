import { useState, useEffect } from "react";

const Grid = ({ start, snakeColour }) => {
  const rows = 15;
  const cols = 10;
  const snakeLength = 5;

  // Initialize snake with the starting position
  const [snake, setSnake] = useState(
    Array(snakeLength)
      .fill(0)
      .map((_, idx) => (start + idx) % rows)
  );

  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(null))
  );

  useEffect(() => {
    if (start === -1) return; // No snake for this column

    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => row.slice());

        // Clear previous snake position
        snake.forEach((row) => {
          newGrid[row][0] = null;
        });

        // Move snake down
        const newSnake = snake.map((row) => (row + 1) % rows);

        newSnake.forEach((row) => {
          newGrid[row][0] = snakeColour;
        });

        setSnake(newSnake);
        return newGrid;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [snake, start, snakeColour]);

  return (
    <div className="grid grid-cols-1 gap-1">
      {grid.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="w-8 h-8 border border-gray-600"
          style={{ backgroundColor: row[0] }}
        ></div>
      ))}
    </div>
  );
};

export default Grid;
