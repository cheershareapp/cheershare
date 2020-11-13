import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function CreateBoardModal(props) {
    const handleClose = () => props.setModal(false);
    const handleShow = () => props.setModal(true);

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
                <form>
                    <label>
                        Who is this Kudoboard for?
                        <input type="text" placeholder="First name"/>
                        <input type="text" placeholder="Last name" />
                    </label>
                    <label>
                        What title would you like on top of the CheerShare?
                        <input type="text" />
                    </label>
                </form>
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
    );
}