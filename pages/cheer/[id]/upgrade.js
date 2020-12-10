import styles from "styles/Home.module.css";
import Header from "components/header";

export default function Upgrade() {
    return (
      <>
          <Header/>
          <div className="container">
              <section>
                  <label><input type="checkbox"/>Mini</label>
                  <label><input type="checkbox"/>Premium</label>
                  <label><input type="checkbox"/>Mega</label>
              </section>
              <div className={styles.grid}>
                  <a className={styles.card}>
                      <h3>Deploy &rarr;</h3>
                      <p>
                          A Mini Kudoboard is FREE and allows up to 10 contributions. It works great if you have a small number of contributors, want to create a 1-to-1 board between you and the recipient, or would like to trial the system. You can start with a Mini board and upgrade later.
                      </p>
                  </a>
                  <a href="https://nextjs.org/learn" className={styles.card}>
                      <p>
                          A Premium Kudoboard allows 100 contributions on a single board for a one-time charge of $5.99. It's perfect for larger groups on birthdays, work anniversaries, and other special occasions! You can start with a Premium board and upgrade later.
                      </p>
                      <h3>Stripe &rarr;</h3>
                  </a>
              </div>
        </div>
      </>
    );
}