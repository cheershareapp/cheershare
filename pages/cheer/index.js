import {useState} from "react";
import useSWR, {mutate} from 'swr'
import {useSession} from "next-auth/client";

import Header from "../../components/header";
import Footer from "../../components/footer";
import BoardSummary from "../../components/board-summary";
import CreateBoardModal from "../../components/create-board";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ListGroup from "react-bootstrap/ListGroup";
import Board from "../../models/Board";
import dbConnect from "../../utils/db";
import fetcher from "../../utils/fetch";

export default function ListBoards({ data: initialData }) {
    const [filter, setFilter] = useState('given');
    const [ session, loading ] = useSession();
    const { data: boards, error, mutate } = useSWR('/api/boards', fetcher, { initialData });

    const [showModal, setModal] = useState(false);
    const handleShow = () => setModal(true);

    // TODO develop board filter
    //.filter(b => b.owner === session.user.id)

    return (<>
        <Header/>
        <CreateBoardModal showModal={showModal} setModal={setModal} />
        {boards ? (<Container>
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
                {boards.map((board, i) => <ListGroup.Item key={board.id || i}>
                    <BoardSummary {...board}/>
                </ListGroup.Item>)}
            </ListGroup>
        </Container>) : ("loading") }
        {/* TODO figure out loading */}
        <Footer fixed/>
    </>);
}

export async function getServerSideProps(context) {
    // const [ session, loading ] = useSession();
    await dbConnect();
    const boards = await Board.index(/* { ownerId: xx }*/);
    return {
        props: { data: boards }, // will be passed to the page component as props
    }
}