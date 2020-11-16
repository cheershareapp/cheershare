import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useSWR from "swr";

export default function CreateBoardModal(props) {
    const handleClose = () => props.setModal(false);
    const handleSubmit = () => {
        // TODO implement POST
        // https://swr.vercel.app/docs/with-nextjs
        // https://github.com/vercel/swr/blob/master/examples/optimistic-ui/pages/index.js
        const { data, error } = useSWR('/api/board');
    }

    return (
        <Modal show={props.showModal} onHide={handleClose}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Create New CheerShare</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Who is this Kudoboard for?</Form.Label>
                        <Form.Control type="text" placeholder="First name" />
                        <Form.Control type="text" placeholder="Last name" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>What title would you like on top of the CheerShare?</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}