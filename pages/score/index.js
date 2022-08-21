import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import dateFormat from "dateformat";
import Link from "next/link";
import styles from "./Score.module.css"

export default function Scores({data}){
    const router = useRouter();
    const [scores, setScores] = useState([]);

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('JOKER_SCORE_DATA')) || {scores: []};
        setScores(data.scores);
    }, []);

    return(
        scores &&
        <div className={styles.scoresWrapper}>
            {scores.map((score, index)=>
                <div key={index} className={styles.score}>
                    <Link href={`/score/${index}`}>
                        {dateFormat(score[0].date, "dd mmmm HH:MM")}
                    </Link>
                    <div className={styles.clearButton}
                         onClick={()=>{
                             const _scores = scores;
                             _scores.splice(index, 1);
                             setScores(_scores);
                             localStorage.setItem('JOKER_SCORE_DATA', JSON.stringify({scores: _scores}));
                             router.reload();
                         }}
                    >
                        Clear
                    </div>
                </div>
            )}
        </div>
    )

}