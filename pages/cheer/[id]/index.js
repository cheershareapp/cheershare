import React, {useState, useRef, useEffect, useCallback} from "react";
import {useRouter} from 'next/router'

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import CheerBanner from "../../../components/CheerBanner";
import CheerBody from "../../../components/CheerBody";
import Sidebar from "../../../components/Sidebar";

import styles from "../../../styles/Editor.module.css"
import { Container} from "react-bootstrap";

import Board from "../../../models/Board";
import Pin from "../../../models/Pin";
import useSWR, { mutate } from "swr";

import dbConnect from "../../../utils/db";
import fetcher from "../../../utils/fetch";

/*
References
https://codepen.io/niklasramo/pen/RJmBVV
https://github.com/haltu/muuri/blob/gh-pages/js/demo-kanban.js
https://github.com/haltu/muuri/blob/gh-pages/css/demo-kanban.css
 */

export default function Editor({ data: initialData }) {
    /* Data fetch */
    const router = useRouter();
    const { id } = router.query;

    const { data, error, mutate } = useSWR(`/api/boards/${id}`, fetcher, { refreshInterval: 1000, initialData });
    /* end data fetch */

    /* State setup */
    const [sidebar, setSidebar] = useState(false);

    const setData = async (partial) => {
        return mutate(await fetcher(`/api/boards/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(partial)
        }), false);
    };
    /* end state setup */

    if (!data || error) return <></>;

    const editable = !('preview' in router.query);

    // TODO(future) figure out spinner/lazy-loading
    /*
    https://medium.com/evolve-technology/hide-that-da6264a7e1f
    {!this.checkLoaded() && <Spinner animation="border" />}
    className={!this.state.loaded && 'visible'}
     */
    return (<div style={{
        backgroundImage: "url(https://www.kudoboard.com/images/fun-background.png)"
    }}>
        <Header/>

        {/*style={{ backgroundImage: `url(${data.backgroundImage})`}}*/}
        <Container className={styles.board}>
            <CheerBanner id={id} data={data} editable={editable} setData={setData}/>
            <CheerBody id={id} data={data} editable={editable} />
        </Container>
        <Sidebar show={sidebar} setSidebar={setSidebar}/>
        <Footer/>
    </div>);
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
