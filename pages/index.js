import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useSession } from 'next-auth/client'
import Footer from "../components/footer";
import CheckoutForm from "../components/CheckoutForm";
import Link from "next/link";

export default function Home() {
    const [ session, loading ] = useSession();
    // if (error) return <div>failed to load</div>;
    // if (!data) return <div>loading...</div>;
  return (
    <div>
      <Head>
        <title>Welcome to Cheershare</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello <span>{session && session.user && session.user.name}!</span>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

          <div className={styles.grid}>
              <Link href="/business">
              <a className={styles.card}>
                  <h3>Business Page &rarr;</h3>
                  <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>
              </Link>
              <Link href="/cheer">
              <a className={styles.card}>
                  <h3>List Boards &rarr;</h3>
                  <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>
              </Link>
          </div>
      </main>
        <CheckoutForm />
        <Footer />
    </div>
  );
}
