import Footer from "../../../components/footer";
import Header from "../../../components/header";
import styles from "../../../styles/Home.module.css";
import React from "react";

export default function Invite() {
    return (
        <>
            <Header />
            <main>
                <h1 className={styles.title}>
                    Invite Contributors
                </h1>

                <h3>Link</h3>
                <p className={styles.description}>
                    Copy/paste the URL below. It will take folks directly to the Kudoboard to contribute.
                    <input type="text" placeholder="URL"/>
                </p>

                <h3>Facebook</h3>
                <p className={styles.description}>
                    Send the invite through a Facebook message.
                    <button>Go to Facebook</button>
                </p>
                <a href="editor">Back to board</a>
            </main>
            <Footer />
        </>
    );
}