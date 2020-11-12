import {useState} from "react";

import Header from "../../components/header";
import Footer from "../../components/footer";
import BoardSummary from "../../components/board-summary";
import CreateBoard from "../../components/create-board";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default function ListBoards() {
    const [filter, setFilter] = useState('given');
    const [showModal, setModal] = useState(false);

    const handleClose = () => setModal(false);
    const handleShow = () => setModal(true);

    return (
        <>
            <Header/>

            <Container>
                <div>
                    <Button variant={filter === 'given' ? "primary" : "link"}
                            onClick={() => setFilter('given')}>
                        Given
                    </Button>
                    |
                    <Button variant={filter === 'received' ? "primary" : "link"}
                            onClick={() => setFilter('received')}>
                        Received
                    </Button>
                    |
                    <Button
                        onClick={() => setModal(true)}  data-toggle="modal" data-target="#exampleModal">
                        New Cheer!
                    </Button>
                </div>

                {[...Array( filter === 'given' ? 3 : 1).keys()].map(id =>
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
