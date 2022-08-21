import {useEffect, useState} from "react";
import styles from "./Game.module.css";
import router, {useRouter} from "next/router";

export default function Game({data}){
    const rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 8, 7, 6, 5, 4, 3, 2, 1, 9, 9, 9, 9];
    const [wanted, setWanted] = useState([null, null, null, null]);
    const [got, setGot] = useState([null, null, null, null]);
    const [scoreData, setScoreData] = useState();
    const [validate, setValidate] = useState(false);
    const router = useRouter();
    const round = +router.query.id;

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('JOKER_SCORE_DATA')) || {scores: []};
        setScoreData(data.scores.slice(-1)[0]);
    }, []);

    return (
        scoreData &&
        <>
            <div className={styles.round}>
                Round {round + 1} - {rounds[round]} Card{rounds[round] > 1 && 's'}
            </div>
            <table className={styles.table}>
                <tr>
                    <td></td>
                    {
                        scoreData.map((score, index) => {
                            return (
                                <td key={index}>
                                    {score.name}
                                </td>
                            )
                        })
                    }
                </tr>
                <tr>
                    <td>Score</td>
                    {
                        scoreData.map((score, index) => {
                            return(
                                <td key={index}>
                                    {score.round.reduce((a, b) => a + b)}
                                </td>
                            )
                        })
                    }
                </tr>
                <tr>
                    <td>Wanted</td>
                    {
                        scoreData.map((score, index) => {
                            return(
                                <td key={index}
                                    style={validate && wanted[index] === null ? {background: "rgba(154,112,112,0.35)"} : {}}
                                >
                                    <input type={"number"}
                                           className={styles.input}
                                           onChange={(e)=>{
                                               const _wanted = wanted;
                                               _wanted[index] = +e.target.value;
                                               setWanted(_wanted);
                                           }}
                                           value={wanted[index]}
                                    />
                                </td>
                            )
                        })
                    }
                </tr>
                <tr>
                    <td>Got</td>
                    {
                        scoreData.map((score, index) => {
                            return(
                                <td key={index}
                                    style={validate && got[index] === null ? {background: "rgba(154,112,112,0.35)"} : {}}
                                >
                                    <input
                                        type={"number"}
                                        className={styles.input}
                                        onChange = {(e) => {
                                            const _got = got;
                                            _got[index] = +e.target.value;
                                            setGot(_got);
                                        }}
                                        value={got[index]}
                                    />
                                </td>
                            )
                        })
                    }
                </tr>
            </table>
            <div className={styles.buttonContainer}>
                <div className={styles.button}
                     onClick={()=>{
                         if(round > 0){
                             router.push(`/game/${round - 1}`);
                             setValidate(false);
                             const inputs = document.querySelectorAll(`.${styles.input}`);
                             inputs.forEach((input, index)=>{
                                 input.value = '';
                             })
                         }
                         else{
                            router.push("/new-score");
                         }
                     }}
                >
                    {'<'} Replay
                </div>
                <div className={styles.button}
                     onClick={()=>{
                         if(![...got, ...wanted].includes(null)){
                             const _scoreData = scoreData;
                             _scoreData.forEach((data, index)=>{
                                 //data[round] = {round: 0};
                                 if(wanted[index] === got[index])
                                     data['round'][round] = wanted[index] * 100;
                                 else if(wanted[index] > got[index])
                                     data['round'][round] = ( got[index] - wanted[index] ) * 100;
                                 else if(wanted[index] < got[index])
                                     data['round'][round] = got[index] * 10;
                             });
                             setScoreData(_scoreData);
                             let _data = data;
                             _data.scores[_data.scores.length - 1] = scoreData;
                             localStorage.setItem('JOKER_SCORE_DATA', JSON.stringify(_data));
                             setGot([null, null,  null, null]);
                             setWanted([null, null,  null, null]);
                             setValidate(false);
                             const inputs = document.querySelectorAll(`.${styles.input}`);
                             inputs.forEach((input, index)=>{
                                 input.value = '';
                             })
                             if(round === rounds.length - 1){
                                 router.push(`/score/${data.scores.length - 1}`);
                             }
                             else
                                 router.push(`/game/${round + 1}`);
                         }
                     else setValidate(true);
                     }}
                >
                    Next {'>'}
                </div>
            </div>
        </>
    )
}