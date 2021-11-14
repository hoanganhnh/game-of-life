import React from 'react'

import ImgItem from './ImgItem';
import LifeBlinkerIcon from '../../img/Oscillators/Game_of_life_blinker.png'
import LifeToadIcon from '../../img/Oscillators/Game_of_life_toad.png'
import LifeBeaconIcon from '../../img/Oscillators/Game_of_life_beacon.png'
import LifePulsarIcon from '../../img/Oscillators/Game_of_life_pulsar.png'
import LifePentaDecathlonIcon from '../../img/Oscillators/I-Column.png'

import styles from './PopupGuide.module.scss'

function OscillatorsItem() {
    return (
        <div className={styles.listContainer}>
            <ImgItem 
                srcImg={LifeBlinkerIcon}
                title='Blinker'
            />
            <ImgItem 
                srcImg={LifeToadIcon}
                title='Toad'
            />
            <ImgItem 
                srcImg={LifeBeaconIcon}
                title='Beacon'
            />
            <ImgItem 
                srcImg={LifePulsarIcon}
                title='Pulsar'
            />
            <ImgItem 
                srcImg={LifePentaDecathlonIcon}
                title='Penta-decathlon'
            />
        </div>
    )
}

export default OscillatorsItem
