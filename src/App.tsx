import React, { useCallback, useRef, useState } from 'react';
import produce from 'immer';

import { Button } from './components';
import useResize from './hook/useResize'
import Icon from './img/icon.svg'
import CloseIcon from './img/close_gray.svg'
import BackIcon from './img/back_modal.svg'
import LifeBlockIcon from './img/Game_of_life_block_with_border.png'
import LifeBlinkerIcon from './img/Game_of_life_blinker.gif'
import LifeAnimatedGkiderIcon from './img/Game_of_life_animated_glider.gif'

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
  const [grid, setGrid] = useState<number[][]>(generateEmptyGrid())
  const [running, setRunning] = useState<boolean>(false)
  const [toggleBtn, setToggleBtn] = useState<boolean>(false);
  const [showPopupGuide, setShowPopupGuide] = useState<boolean>()

  const sizeDevice = useResize();

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

  const isMobileDevice: boolean = sizeDevice <= 748

  const handleToggleStopStart = (): void => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  }

  const handleRandomCell = () : void => {
    setGrid(randomGenerateEmptyGrid());
  }

  const handleReset = (): void => {
    setGrid(generateEmptyGrid())
    runningRef.current = false;
    setRunning(false);
  }

  const onCreateCell = (i: number, k: number): void => {
    const newGrids = produce(grid, gridCopy => {
      gridCopy[i][k] = grid[i][k] ? 0 : 1;
    })
    setGrid(newGrids)
  }
  
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.containerHeader}>
          <div className={styles.mainHeading}>
            <img src={Icon} alt="Icon" />
            <h1>Game of Life</h1>
          </div>
          {
            isMobileDevice ? (
              <>
                <div 
                  id ="btnHamburger" 
                  className={`${styles.header__toggle} ${toggleBtn ? styles.open : ''}`} 
                  onClick={() => setToggleBtn(!toggleBtn)}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className={`${styles.wrapperMenuBtn} ${toggleBtn ? styles.menuMobile : ''} ${toggleBtn ? styles.showMenu : ''}`}>
                  <div className={styles.overlay} onClick={() => setToggleBtn(false)}></div>
                  <div className={styles.guopBtnMobile}>
                    <Button 
                        content={running ? 'Stop' : 'Start'}
                        onClick={handleToggleStopStart}
                      />
                      <Button 
                        content="Randon"
                        onClick={handleRandomCell}
                      />
                      <Button 
                        content="Reset"
                        onClick={handleReset}
                      />
                      <Button 
                        content="Guide"
                        onClick={() => {
                          setShowPopupGuide(true)
                        }}
                      />
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.btnGruop}>
                <Button 
                  content={running ? 'Stop' : 'Start'}
                  onClick={handleToggleStopStart
                  }
                />
                <Button 
                  content="Randon"
                  onClick={handleRandomCell}
                />
                <Button 
                  content="Reset"
                  onClick={handleReset}
                />
                <Button 
                  content="Guide"
                  onClick={() => {
                    setShowPopupGuide(true)
                  }}
                />
              </div>
            )
          }
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
                  onMouseEnter={() => onCreateCell(i, k)}
                  onTouchStart={() => onCreateCell(i, k)}
                  onTouchMove={() => onCreateCell(i, k)}
                  onClick={() => onCreateCell(i, k)}
                  
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
      {showPopupGuide && (
        <div className={styles.containerGuide}>
          <div className={styles.mainGuideLayout}>
            <img onClick={() => setShowPopupGuide(false)} className={styles.closeIcon} src={CloseIcon} alt="CloseIcon" width="32" height="32"/>
            <div className={styles.gruopTitle}>
              <div className={styles.mainHeaderPopup}>
                <div className={styles.backIcon} style={{ backgroundImage: `url(${BackIcon})`}} />
              </div>
              <div className={styles.mainContentPopup}>
                <div className={styles.wrapperContent}>
                  <div className={styles.guideContainer}>
                    <div className={styles.mainTitleContainer}>
                      <div className={styles.mainTitle}>Guide draw</div>
                    </div>
                    <div className={styles.listContainer}>
                      <div className={styles.itemGuide}>
                        <div className={styles.itemGuideIconContainer}>
                          <div className={styles.iconGuideItem} style={{ backgroundImage: `url(${LifeBlockIcon})`}} />
                        </div>
                        <div className={styles.itemName}>Still lifes</div>
                      </div>
                      <div className={styles.itemGuide}>
                        <div className={styles.itemGuideIconContainer}>
                          <div className={styles.iconGuideItem} style={{ backgroundImage: `url(${LifeBlinkerIcon})`}} />
                        </div>
                        <div className={styles.itemName}>Oscillators</div>
                      </div>
                      <div className={styles.itemGuide}>
                        <div className={styles.itemGuideIconContainer}>
                          <div className={styles.iconGuideItem} style={{ backgroundImage: `url(${LifeAnimatedGkiderIcon})`}} />
                        </div>
                        <div className={styles.itemName}>Spaceships</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.overlay} onClick={() => setShowPopupGuide(false)} />
        </div>
      )}
    </div>
  );
}

export default App;
