import React, {useState} from "react";
import {useRouter} from 'next/router'
import Head from 'next/head'

import Header from "components/header";
import Footer from "components/footer";
import CheerBanner from "components/CheerBanner";
import CheerBody from "components/CheerBody";
import Sidebar from "components/Sidebar";

import styles from "styles/Editor.module.css"
import { Container, Alert } from "react-bootstrap";

import Board from "models/Board";
import Pin from "models/Pin";
import useSWR from "swr";

import dbConnect from "utils/db";
import fetcher from "utils/fetch";
import {redirectToLogin} from "utils/redirectToLogin";
import {useSession} from "next-auth/client";


function AccountRequiredAlert({id}) {
    const [show, setShow] = useState(true);

    if (!show) return <></>;

    return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible
               onClick={() => redirectToLogin(`/cheer/${id}`)}>
            <Alert.Heading>You need an account!</Alert.Heading>
            <p>Click here to create an account or login to add your Cheer!</p>
        </Alert>
    );
}

function PermissionAlert({message, data, id}) {
    const [show, setShow] = useState(true);

    if (!show) return <></>;

    return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible
               onClick={() => redirectToLogin(`/cheer/${id}`)}>
            <Alert.Heading>Please contact {data.ownerName}</Alert.Heading>
            <p>{message}</p>
            <Alert.Link href={`/cheer/${id}`}>Refresh page</Alert.Link>
        </Alert>
    );
}

export default function EditorPage({ data: initialData }) {
    const router = useRouter();
    const { id } = router.query;
    const editable = !('preview' in router.query);

    const [session, loading] = useSession();
    const [sidebar, setSidebar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { data, error, mutate } = useSWR(`/api/boards/${id}`, fetcher, { refreshInterval: 1000, initialData });

    const setData = async (partial) => {
        const newBoard = await fetcher(`/api/boards/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(partial)
        });

        if (newBoard.success === false) {
            return setErrorMessage('You don\'t have the correct permissions');
        }

        return mutate(newBoard, false);
    };

    // TODO(future) figure out spinner/lazy-loading

    return (
        <div style={{
            backgroundImage: `url(${data.backgroundImage || '/images/fun-background.png'})`
        }}>
            <Head>
                <title>Editing {data.title}</title>
                <meta property="og:title" content={`Celebrate ${data.recipientFirstName}, add your cheer here!`} />
                <meta property="og:type" content="website" />
                <meta property="og:description" content={`We're celebrating ${data.recipientFirstName}. Add your cheer for the "${data.title}" board.`} />
                {data.coverImage && <meta property="og:image" content={data.coverImage} />}
            </Head>
            <Header className="bg-light"/>
            {editable && !session && !loading && <AccountRequiredAlert id={id}/>}
            {errorMessage.length > 0 && <PermissionAlert data={data} message={errorMessage} id={id}/>}
            <Container className={styles.board}>
                <CheerBanner id={id} data={data} editable={editable} setData={setData} setSidebar={setSidebar}/>
                <CheerBody id={id} data={data} editable={editable && session} />
            </Container>
            <Sidebar show={sidebar} setSidebar={setSidebar}/>
            <Footer/>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;

    await dbConnect();
    const [ board ] = await Board.index({ _id: id});
    const pins = await Pin.find({ boardId: board.id });

    return {
        props: { data: {
            pins: pins.map(v => v.toJSON()),
            ...board
        } }, // will be passed to the page component as props
    }
}
