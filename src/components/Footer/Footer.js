import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerBlock}>
                <div className={styles.copyright}>© Unilever 2019</div>
                <div className={styles.links}>
                    <a href="#">Cookie policy</a>
                    <a href="#">Privacy policy</a>
                    <a href="#">Terms and conditions</a>
                </div>
            </div>
        </div>
    )
}
