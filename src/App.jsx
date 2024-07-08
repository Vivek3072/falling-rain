import React, { useEffect, useState } from "react";
import "./index.css";
import Grid from "./Grid";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function App() {
  const startPos = [
    1, -1, -1, 6, 0, -1, 4, 2, -1, -1, 8, 7, -1, -1, -1, 1, 7, 0, -1, 3,
  ];

  const [snakeColour, setSnakeColour] = useState(getRandomColor());

  useEffect(() => {
    const interval = setInterval(() => {
      setSnakeColour(getRandomColor());
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid content-center">
      <h1 className="text-4xl mb-4 text-center my-4 text-white">
        Rain Pattern
      </h1>
      <div className="flex flex-row gap-1 w-fit mx-auto">
        {startPos.map((pos, idx) => (
          <Grid start={pos} key={idx} snakeColour={snakeColour} />
        ))}
      </div>
    </div>
  );
}

export default App;
