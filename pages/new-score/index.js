import {useState} from "react";
import styles from "./NewStore.module.css"
import {NotificationManager} from "react-notifications";
import {useRouter} from "next/router";


export default function NewScore({data}){

    const [names, setNames] = useState(['', '', '', '']);
    const [validate, setValidate] = useState(false);
    const router = useRouter();
    return (
        <>
            <div className={styles.inputGroup}>
                {names.map((name, index) => {
                    return(
                        <div className={styles.inputWrapper}
                             key={index}
                             style={validate && names[index] === "" ? {background: "rgba(154,112,112,0.35)"} : {}}
                        >
                            <input type="text"
                                   className={styles.input}
                                   placeholder={'Name'}
                                   tabIndex={index}
                                   onChange={(e)=>{
                                       let inputNames = names;
                                       inputNames[index] = e.target.value;
                                       setNames(inputNames);
                                   }}
                            />
                        </div>)
                })}
            </div>
            <div
                className={styles.submit}
                onClick={()=>{
                    const notValid = names.includes('');
                    if(!notValid) {
                        const storageData = data;
                        storageData.scores.push(names.map((name) => ({name: name, round: [0], date: new Date()})));
                        localStorage.setItem('JOKER_SCORE_DATA', JSON.stringify(storageData));
                        router.push('/game/0');
                    }
                    else{
                        setValidate(true);
                    }
                }}
            >
                Start
            </div>
        </>
    )
}