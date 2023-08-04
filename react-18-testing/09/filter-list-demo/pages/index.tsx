import Head from 'next/head'
import styles from '@/pages/index.module.css'
import FilterList from '../components/FilterList'
import LazyLabel from '@/components/LazyContent'

export const listOfMetals = ["Lithium","Beryllium", "Sodium", "Magnesium", "Aluminium","Potassium", "Calcium","Scandium", "Titanium", "Vanadium","Chromium"]

export default function Home() {

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Filter List
        </h1>
        <div>
          <FilterList items={listOfMetals} onChange={console.log} />
        </div>
        <p>
          The <code>FilterList</code> component supports selecting list items, and filtering the list. 
        </p>
        <div style={{marginTop: "200px"}}>
          <LazyLabel delay={1000}>Some lazy-loaded content</LazyLabel>
        </div>
      </main>
      
      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}
