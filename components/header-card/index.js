import styles from './HeaderCard.module.css'
import {useEffect, useState} from "react";

export default function HeaderCard({side}){

    const [angle, setAngle] = useState(35);

    useEffect(()=>{
        setAngle(angle => angle + 180);
    }, [side]);

    return(
        <div
            className={styles.cardWrapper}
            style={{
                transform: `rotate(${angle}deg)`,
                boxShadow: side ? '-2px -2px 2px 2px rgba(0, 0, 0, 0.22)' : '2px 2px 2px 2px rgba(0, 0, 0, 0.22)'
            }}
        >
            <div className={styles.card}>
                <div className={styles.icon}>☆</div>
                <div className={styles.joker}>
                    <div className={styles.textWrapper}>
                        <div className={styles.textTop}>Joker</div>
                    </div>
                    <div className={styles.textWrapper}>
                        <div className={styles.textBottom}>Joker</div>
                    </div>
                </div>
                <div className={styles.iconBlack}>☆</div>
            </div>
        </div>
    )
}