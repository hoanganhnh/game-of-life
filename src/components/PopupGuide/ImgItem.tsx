import React from 'react'

import styles from './PopupGuide.module.scss'

interface Props {
    srcImg: string;
    title: string;
}

function ImgItem({
    srcImg,
    title
}: Props) {
    return (
        <div className={styles.centerItem}>
            <div className={styles.wrapperItemImg}>
                <div className={styles.imgContainer}>
                    <img src={srcImg} alt="img" />
                </div>
                <div className={styles.descImg}>
                    {title}
                </div>
            </div>
        </div>
    )
}

export default ImgItem
