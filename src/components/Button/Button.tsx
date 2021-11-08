import React from 'react'

import styles from './Button.module.scss'

interface Props {
    content: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

function Button({
    content='',
    onClick
}:Props) {
    return (
        <button type="button" className={styles.btn} onClick={onClick}>
            {content}
        </button>
    )
}

export default Button
