import {useState} from "react";

import Header from "../../components/header";
import Footer from "../../components/footer";
import BoardSummary from "../../components/board-summary";
import CreateBoard from "../../components/create-board";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';


export default function ListBoards() {
    const [filter, setFilter] = useState('given');
    const [showModal, setModal] = useState(false);

    const handleClose = () => setModal(false);
    const handleShow = () => setModal(true);

    return (
        <>
            <Header/>

            <Container>
                <Nav variant="pills" activeKey="given" onSelect={setFilter}>
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

                {[...Array(filter === 'given' ? 3 : 1).keys()].map(id =>
                    <BoardSummary id={id} key={id}/>
                )}
            </Container>


            <Modal show={showModal} onHide={handleClose}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateBoard/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer/>
        </>
    );
}
