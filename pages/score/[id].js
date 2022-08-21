import {useEffect, useState} from "react";
import {useRouter} from "next/router"
import styles from './Score.module.css'
import Link from "next/link";

export default function Score({data}){
    const router = useRouter();
    const [scores, setScores] = useState();

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('JOKER_SCORE_DATA')) || {scores: []};
        setScores(data.scores[router.query.id]);
        console.log(scores);
    }, [router.query.id]);

    return(
        scores &&
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td className={styles.tdSmall}> </td>
                        {
                            scores?.map((score, index) => {
                                return(
                                    <td key={index}>
                                        {score.name}
                                    </td>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    scores && scores[0].round.map((score, index) =>
                    <tr key={index}>
                        <td className={styles.tdSmall}>{index + 1}</td>
                        <td>{scores[0].round[index]}</td>
                        <td>{scores[1].round[index]}</td>
                        <td>{scores[2].round[index]}</td>
                        <td>{scores[3].round[index]}</td>
                    </tr>
                    )
                }
                <tr>
                    <td className={styles.tdSmall}>∑</td>
                    {scores?.map((score, index) => <td key={index}>{score.round.reduce((a, b) => a + b)}</td>)}
                </tr>
                </tbody>
            </table>
            <Link href={'/score'}>
                <div className={styles.button}>
                    Scores
                </div>
            </Link>
        </>
    )
}