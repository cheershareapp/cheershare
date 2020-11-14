import Footer from "../../../components/footer";
import Header from "../../../components/header";
import styles from "../../../styles/Home.module.css";
import React from "react";
import { useRouter } from 'next/router'
import {Button} from "react-bootstrap";

export default function Invite() {
    const router = useRouter()

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
                    <Button>Go to Facebook</Button>
                </p>
                <Button variant="link" onClick={() => router.back()}>Back to board</Button>
            </main>
            <Footer fixed/>
        </>
    );
}