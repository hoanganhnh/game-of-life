import React from 'react'

import LifeBlockIcon from '../../img/Game_of_life_block_with_border.png'
import LifeBlinkerIcon from '../../img/Game_of_life_blinker.gif'
import LifeAnimatedGkiderIcon from '../../img/Game_of_life_animated_glider.gif'
import { 
    STILL_LIFE,
    OSCILLATORS,
    SPACESHIPS,
} from './contains';

import styles from './PopupGuide.module.scss'

interface Props {
    onUpdateCurrentLayout:(title: string) => void;
}

function ListTitleGuide({
    onUpdateCurrentLayout
}: Props) {
    return (
        <div className={styles.listContainer}>
            <div className={styles.itemGuide} onClick={() => onUpdateCurrentLayout(STILL_LIFE)}>
                <div className={styles.itemGuideIconContainer}onClick={() => onUpdateCurrentLayout(STILL_LIFE)}>
                <div className={styles.iconGuideItem} style={{ backgroundImage: `url(${LifeBlockIcon})`}} />
                </div>
                <div className={styles.itemName}>Still lifes</div>
            </div>
            <div className={styles.itemGuide} onClick={() => onUpdateCurrentLayout(OSCILLATORS)}>
                <div className={styles.itemGuideIconContainer}>
                <div className={styles.iconGuideItem} style={{ backgroundImage: `url(${LifeBlinkerIcon})`}} />
                </div>
                <div className={styles.itemName}>Oscillators</div>
            </div>
            <div className={styles.itemGuide} onClick={() => onUpdateCurrentLayout(SPACESHIPS)}>
                <div className={styles.itemGuideIconContainer}>
                <div className={styles.iconGuideItem} style={{ backgroundImage: `url(${LifeAnimatedGkiderIcon})`}} />
                </div>
                <div className={styles.itemName}>Spaceships</div>
            </div>
        </div>
    )
}

export default ListTitleGuide
