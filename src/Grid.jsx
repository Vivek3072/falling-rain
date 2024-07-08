import { useState, useEffect } from "react";

const Grid = ({ start, rainColour }) => {
  const rows = 15;
  const cols = 10;
  const rainLength = 5;

  // Initialize rain with the starting position
  const [rain, setrain] = useState(
    Array(rainLength)
      .fill(0)
      .map((_, idx) => (start + idx) % rows)
  );

  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(null))
  );

  useEffect(() => {
    if (start === -1) return; // No rain for this column

    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => row.slice());

        // Clear previous rain position
        rain.forEach((row) => {
          newGrid[row][0] = null;
        });

        // Move rain down
        const newrain = rain.map((row) => (row + 1) % rows);

        newrain.forEach((row) => {
          newGrid[row][0] = rainColour;
        });

        setrain(newrain);
        return newGrid;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [rain, start, rainColour]);

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
