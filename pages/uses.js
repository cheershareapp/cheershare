import {useState} from "react";

import Header from "../components/header";
import Footer from "../components/footer";

import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Uses() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (<>
        <Header/>

        <Container>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>
            SEO
        </Container>

        <Footer fixed/>
        {/* CSS from https://codepen.io/bootpen/pen/jbbaRa */}
        <style global jsx>{`
            .modal.right .modal-dialog {
                position: fixed;
                margin: auto;
                width: 320px;
                height: 100%;
                transform: translate3d(0%, 0, 0);
            }
            
            .modal.right .modal-content {
                height: 100%;
                overflow-y: auto;
            }
                
            /* disused
            .modal.right.fade .modal-dialog {
                right: -320px;
                transition: opacity 0.3s linear, right 0.3s ease-out;
            }
            */
            
            .modal.right .modal-dialog {
                right: 0;
            }
        `}</style>
    </>);
}
