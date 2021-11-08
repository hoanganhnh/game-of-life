import React, { useCallback, useRef, useState } from 'react';
import produce from 'immer';

import { Button } from './components';
import Icon from './img/icon.svg'

import styles from './App.module.scss'

const TIME_SPEED = 100;
const SIZE_CELL = 25;

const numRows =  Math.floor((window.innerHeight - 54) /SIZE_CELL);
const numCols =  Math.floor(window.innerWidth /SIZE_CELL);

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

    setTimeout(runSimulation, TIME_SPEED);
  }, []);
  
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.containerHeader}>
          <div className={styles.mainHeading}>
            <img src={Icon} alt="Icon" />
            <h1>Game of Life</h1>
          </div>
          <div className={styles.btnGruop}>
            <Button 
              content={running ? 'Stop' : 'Start'}
              onClick={
                () => {
                  setRunning(!running) 
                  if (!running) {
                    runningRef.current = true;
                    runSimulation();
                  }
                }
              }
            />
            <Button 
              content="Randon"
              onClick={() => setGrid(randomGenerateEmptyGrid())}
            />
            <Button 
              content="Reset"
              onClick={() => {
                setGrid(generateEmptyGrid())
                runningRef.current = false;
                setRunning(false);
              }}
            />
          </div>
        </div>
      </header>
      <div className={styles.grid} style={{marginTop: `${SIZE_CELL / 3}px`}}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCols}, ${SIZE_CELL}px)`,
            transition: 'all 0.25s'
          }}
        >
          {
            grid.map((rows, i) => 
              rows.map((col, k) => (
                <div
                  key={`${i}-${k}`}
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    const newGrids = produce(grid, gridCopy => {
                      gridCopy[i][k] = grid[i][k] ? 0 : 1;
                    })
                    setGrid(newGrids)
                  }}
                  onMouseLeave={(e) => {
                    e.preventDefault();
                    const newGrids = produce(grid, gridCopy => {
                      gridCopy[i][k] = grid[i][k] ? 0 : 1;
                    })
                    setGrid(newGrids)
                  }}
                  
                  style={{
                    width: SIZE_CELL,
                    height: SIZE_CELL,
                    backgroundColor: grid[i][k] ? "#0c3547" : "#fff",
                    border: !grid[i][k] ? '0.5px solid #afd8f8' : 'none',
                  }}
                />
            )))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
