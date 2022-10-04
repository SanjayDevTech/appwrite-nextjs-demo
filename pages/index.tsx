import Head from 'next/head'
import Image from 'next/image'
import MyHead from '../components/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <MyHead/>
    </div>
  )
}
