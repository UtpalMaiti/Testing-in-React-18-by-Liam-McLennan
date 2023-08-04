import { useState } from 'react'
import styles from '@/pages/index.module.css'
import FilterList from '../components/FilterList'

export const listOfMetals = ["Lithium", "Beryllium", "Sodium", "Magnesium", "Aluminium", "Potassium", "Calcium", "Scandium", "Titanium", "Vanadium", "Chromium"]

export default function Metals(props) {
    let [selected, setSelected] = useState([]);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Metals
                </h1>
                <div className={styles.body}>
                    <div className={styles.left}>
                        <FilterList items={listOfMetals} onChange={setSelected} />
                    </div>
                    <div className={styles.right} aria-label="Metals display">
                        {selected.map((m) => 
                            <div className={styles.metal} aria-label="Metal">
                                <img src={`metals/${m}.jpg`}></img>
                                <p>{m}</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
} 