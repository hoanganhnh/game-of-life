import React, { useState } from 'react'

import ListTitleGuide from './ListTitleGuide';
import StillLifeItem from './StillLifeItem';
import OscillatorsItem from './OscillatorsItem';
import SpaceshipsItem from './SpaceshipsItem';
import CloseIcon from '../../img/close_gray.svg';
import BackIcon from '../../img/back_modal.svg';
import { 
    MAIN_LAYOUT,
    STILL_LIFE,
    OSCILLATORS,
    SPACESHIPS
} from './contains';

import styles from './PopupGuide.module.scss'

interface Props {
    onClosePopupGuide: () => void;
}

function PopupGuide({
    onClosePopupGuide
}:Props) {
    const [currentTitleGuide, setCurrentTitleGuide] = useState<string>(MAIN_LAYOUT)

    const handleSetCurrentGuideLayout = (title: string): void => {
        setCurrentTitleGuide(title);
    }

    const isMainLayout: boolean = currentTitleGuide === MAIN_LAYOUT;
    const isStillLife: boolean = currentTitleGuide === STILL_LIFE;
    const isOscillators: boolean = currentTitleGuide === OSCILLATORS;
    const isSpaceships: boolean = currentTitleGuide === SPACESHIPS;

    return (
        <div className={styles.wrapper}>
          <div className={styles.mainGuideLayout}>
            <img onClick={onClosePopupGuide} className={styles.closeIcon} src={CloseIcon} alt="CloseIcon" width="32" height="32"/>
            <div className={styles.gruopTitle}>
              <div className={styles.mainHeaderPopup}>
                {!isMainLayout && (
                    <div 
                        className={styles.backIcon} 
                        style={{ backgroundImage: `url(${BackIcon})`}}
                        onClick={() => setCurrentTitleGuide(MAIN_LAYOUT)}
                    />
                )}
              </div>
              <div className={styles.mainContentPopup}>
                <div className={styles.wrapperContent}>
                  <div className={styles.guideContainer}>
                    <div className={styles.mainTitleContainer}>
                      <div className={styles.mainTitle}>{currentTitleGuide}</div>
                    </div>
                    {isMainLayout && (
                        <ListTitleGuide
                            onUpdateCurrentLayout={handleSetCurrentGuideLayout}
                        />
                    )}
                    {isStillLife && (
                        <StillLifeItem />
                    )}
                    {isOscillators && (
                        <OscillatorsItem />
                    )}
                    {isSpaceships && (
                        <SpaceshipsItem />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.overlay} onClick={onClosePopupGuide} />
        </div>
    )
}

export default PopupGuide
