import React, {useState} from "react";
import useSWR, {mutate} from 'swr'
import {useSession, getSession} from "next-auth/client";

import Header from "components/header";
import Footer from "components/footer";
import BoardSummary from "components/board-summary";
import CreateBoardModal from "components/create-board";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ListGroup from "react-bootstrap/ListGroup";
import Board from "models/Board";
import dbConnect from "utils/db";
import fetcher from "utils/fetch";
import {redirectToLogin} from "utils/redirectToLogin";

export default function ListBoards({ data: initialData }) {
    const [filter, setFilter] = useState('given');
    const [ session, loading ] = useSession();
    const { data: boards, error, mutate } = useSWR('/api/boards', fetcher, { initialData });

    const [showModal, setModal] = useState(false);
    const handleShow = () => setModal(true);

    if (loading) return <></>;
    const filteredBoards = filter === "given"
        ? boards.filter(b => b.recipientEmail !== session.user.email)
        : boards.filter(b => b.recipientEmail === session.user.email);

    return (<>
        <Header/>
        <CreateBoardModal showModal={showModal} setModal={setModal} />
        <Container className="min-vh-100">
            <Nav variant="pills" activeKey={filter} onSelect={setFilter} className="py-4">
                <Nav.Item>
                    <Nav.Link eventKey="given">
                        Given
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="received">
                        Received
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={handleShow}>
                        New Cheer!
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <ListGroup variant="flush">
                {filteredBoards.map((board, i) => <ListGroup.Item key={board.id || i}>
                    <BoardSummary {...board}/>
                </ListGroup.Item>)}
            </ListGroup>
        </Container>
        <Footer/>
    </>);
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        redirectToLogin('/cheer', context.res);
    }
    await dbConnect();
    const boards = await Board.index({ $or: [
        {ownerId: session.user.id},
        {collaborators: session.user.id},
        {recipientEmail: session.user.email},
    ]});

    return {
        props: { data: boards }, // will be passed to the page component as props
    }
}