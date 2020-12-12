import React, {useState} from "react";
import {useRouter} from 'next/router'

import Header from "components/header";
import Footer from "components/footer";
import CheerBanner from "components/CheerBanner";
import CheerBody from "components/CheerBody";
import Sidebar from "components/Sidebar";

import styles from "styles/Editor.module.css"
import { Container} from "react-bootstrap";

import Board from "models/Board";
import Pin from "models/Pin";
import useSWR, { mutate } from "swr";

import dbConnect from "utils/db";
import fetcher from "utils/fetch";
import {redirectToLogin} from "../../../utils/redirectToLogin";
import {getSession} from "next-auth/client";


export default function EditorPage({ data: initialData }) {
    const router = useRouter();
    const { id } = router.query;
    const editable = !('preview' in router.query);

    const [sidebar, setSidebar] = useState(false);

    const { data, error, mutate } = useSWR(`/api/boards/${id}`, fetcher, { refreshInterval: 1000, initialData });

    const setData = async (partial) => {
        return mutate(await fetcher(`/api/boards/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(partial)
        }), false);
    };

    // TODO(future) figure out spinner/lazy-loading

    return (
        <div style={{
            backgroundImage: `url(${data.backgroundImage || '/images/fun-background.png'})`
        }}>
            <Header/>
            <Container className={styles.board}>
                <CheerBanner id={id} data={data} editable={editable} setData={setData} setSidebar={setSidebar}/>
                <CheerBody id={id} data={data} editable={editable} />
            </Container>
            <Sidebar show={sidebar} setSidebar={setSidebar}/>
            <Footer/>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const session = await getSession(context);

    if (!session) {
        return redirectToLogin(`/cheer/${id}`, context.res);
    }

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
