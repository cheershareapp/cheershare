import Head from 'next/head'
import styles from '../styles/Home.module.css'

import React, {Component} from 'react';
import { useSession } from 'next-auth/client'
import CreateBoard from "../components/create-board";
import Footer from "../components/footer";


export default function Home() {
    const [ session, loading ] = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

          <div className={styles.grid}>
              <a href="/business" className={styles.card}>
                  <h3>Business Page &rarr;</h3>
                  <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>
              <a
                  href="/cheer"
                  className={styles.card}
              >
                  <h3>List Boards &rarr;</h3>
                  <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>
          </div>
      </main>

        <Footer />
    </div>
  )
}
