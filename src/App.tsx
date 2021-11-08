import React, { useCallback, useRef, useState } from 'react';
import produce from 'immer';

const numRows = 25;
const numCols = 25;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
}

const randomGenerateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.5 ? 0 : 1)));
  }
  return rows;
}

function App(): JSX.Element {
  const [grid, setGrid] = useState(generateEmptyGrid())
  const [running, setRunning] = useState(false)

  const runningRef = useRef(running)
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 200);
  }, []);
  
  return (
    <>
      <button 
        onClick={
          () => {
            setRunning(!running)
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }
        }
      >
        {running ? 'stop' : 'start'}
      </button>
      <button onClick={() => setGrid(randomGenerateEmptyGrid())}>Randdon</button>
      <button 
        onClick={() => {
          setGrid(generateEmptyGrid())
          runningRef.current = false;
          setRunning(false);
        }}
      >
        Reset
      </button>
      <div className="App" 
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {
          grid.map((rows, i) => 
            rows.map((col, k) => (
              <div
                key={`${i}-${k}`}
                onClick={() => {
                  const newGrids = produce(grid, gridCopy => {
                    gridCopy[i][k] = grid[i][k] ? 0 : 1;
                  })
                  setGrid(newGrids)
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][k] ? "pink" : undefined,
                  border: '1px solid #000',
                }}
              />
          )))
        }
      </div>
    </>
  );
}

export default App;
