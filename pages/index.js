import styles from '../styles/Home.module.css'
import Link from "next/link";
import HeaderCard from "../components/header-card";
import {useState} from "react";

export default function Home() {

      return (
            <>
                <main>
                    <section className={styles.menu}>
                        <div className={styles.button}>
                            <Link href={'/new-score'}>
                                <div>
                                    Start A New Score
                                </div>
                            </Link>
                        </div>
                        <div className={styles.button}>
                            <Link href={'/score'}>
                                <div>
                                    Previous Scores
                                </div>
                            </Link>
                        </div>
                    </section>
                </main>
            </>
      )
}
