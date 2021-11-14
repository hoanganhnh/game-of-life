import React from 'react'

import ImgItem from './ImgItem';
import LifeBlockIcon from '../../img/StillLifes/Game_of_life_block_with_border.png'
import LifeBeehiveIcon from '../../img/StillLifes/Game_of_life_beehive.png'
import LifeLoafIcon from '../../img/StillLifes/Game_of_life_loaf.png'
import LifeBoatIcon from '../../img/StillLifes/Game_of_life_boat.png'
import LifeFlowerIcon from '../../img/StillLifes/Game_of_life_flower.png'

import styles from './PopupGuide.module.scss'

function StillLifeItem() {
    return (
        <div className={styles.listContainer}>
            <ImgItem 
                srcImg={LifeBlockIcon}
                title='Block'
            />
            <ImgItem 
                srcImg={LifeBeehiveIcon}
                title='Bee-hive'
            />
            <ImgItem 
                srcImg={LifeLoafIcon}
                title='Loaf'
            />
            <ImgItem 
                srcImg={LifeBoatIcon}
                title='Boat'
            />
            <ImgItem 
                srcImg={LifeFlowerIcon}
                title='Tub'
            />
        </div>
    )
}

export default StillLifeItem
