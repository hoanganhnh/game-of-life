import React from 'react'

import ImgItem from './ImgItem';
import LifeLWSSIcon from '../../img/Spaceships/Game_of_life_animated_LWSS.png'
import LifeGliderIcon from '../../img/Spaceships/Game_of_life_animated_glider.png'
import LifeMWSSIcon from '../../img/Spaceships/Animated_Mwss.png'
import LifeHWSSIcon from '../../img/Spaceships/Animated_Hwss.png'

import styles from './PopupGuide.module.scss'

function SpaceshipsItem() {
    return (
        <div className={styles.listContainer}>
            <ImgItem 
                srcImg={LifeLWSSIcon}
                title='Light-weight spaceship(LWSS)'
            />
            <ImgItem 
                srcImg={LifeGliderIcon}
                title='Glider'
            />
            <ImgItem 
                srcImg={LifeMWSSIcon}
                title='Middle-weight spaceship(MWSS)'
            />
            <ImgItem 
                srcImg={LifeHWSSIcon}
                title='Heavy-weight spaceship(HWSS)'
            />
        </div>
    )
}

export default SpaceshipsItem
