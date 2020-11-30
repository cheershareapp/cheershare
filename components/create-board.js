import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { mutate } from "swr";
import fetcher from "../utils/fetch";
import { useRouter } from 'next/router'

export default function CreateBoardModal({ setModal, showModal }) {
    const handleClose = () => setModal(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { target: form } = e;
        const { elements } = form;
        // TODO future optimization, const alias = +Date.now();

        const newBoardProps = {
            title: elements.title.value,
            recipientFirstName: elements.recipientFirstName.value,
            recipientLastName: elements.recipientLastName.value,
        };

        const newBoard = await fetcher('/api/boards', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBoardProps)
        });

        await mutate('/api/boards',async (boards) => boards ? [ ...boards, newBoard ] : [ newBoard ]);

        return router.push(`/cheer/${newBoard.id}/`)
    };

    return (
        <Modal show={showModal} onHide={handleClose}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered
        ><Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Create New CheerShare</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Who is this Cheerboard for?</Form.Label>
                        <Form.Control type="text" placeholder="First name" name="recipientFirstName"/>
                        <Form.Control type="text" placeholder="Last name" name="recipientLastName" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>What title would you like on top of the Cheerboard?</Form.Label>
                        <Form.Control type="text" name="title" />
                    </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Form></Modal>
    );
}