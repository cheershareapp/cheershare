/*
import styles from "../styles/Home.module.css";
<footer className={styles.footer}>
    <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
    >
        Powered by{' '}
        <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
    </a>
</footer>
*/

export default function Footer() {
    return (
        <footer className="text-muted py-5">
            <div className="container">
                <p className="float-right mb-1">
                    <a href="#">Back to top</a>
                </p>
                <p className="mb-1">Album example is &copy; Bootstrap, but please download and customize it for
                    yourself!</p>
                <p className="mb-0">New to Bootstrap? <a href="/">Visit the homepage</a> or read our <a
                    href="../getting-started/introduction/">getting started guide</a>.</p>
            </div>
        </footer>
    )
}