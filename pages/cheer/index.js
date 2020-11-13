import {useState} from "react";

import Header from "../../components/header";
import Footer from "../../components/footer";
import BoardSummary from "../../components/board-summary";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import CreateBoardModal from "../../components/create-board";
import ListGroup from "react-bootstrap/ListGroup";


export default function ListBoards() {
    const [filter, setFilter] = useState('given');

    // TODO use a modal provider
    const [showModal, setModal] = useState(false);
    const handleShow = () => setModal(true);

    return (
        <>
            <Header/>
            <CreateBoardModal showModal={showModal} setModal={setModal}/>
            <Container>
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
                    {[...Array(filter === 'given' ? 3 : 1).keys()].map(id => (<ListGroup.Item key={id}>
                        <BoardSummary id={id}/>
                    </ListGroup.Item>))}
                </ListGroup>
            </Container>

            <Footer/>
        </>
    );
}
