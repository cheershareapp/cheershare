import { resetServerContext } from "react-beautiful-dnd";
import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);

        // https://codedaily.io/tutorials/185/Using-react-beautiful-dnd-with-NextJS
        resetServerContext();
        return { ...initialProps }
    }

    render() {
        return (<Html lang="en">
            <Head>
                {/*<title>Welcome to Cheershare</title>*/}
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>)
    }
}

export default MyDocument