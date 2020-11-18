import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from '../styles/Sidebar.module.css'

const Sidebar = ({ show, setSidebar }) => {
    const handleClose = () => setSidebar(false);
    const handleShow = () => setSidebar(true);

    // TODO Use Optimized images for Pins, image search, background selection, etc.
    // https://nextjs.org/docs/basic-features/image-optimization
    return (<>
        <Modal show={show} onHide={handleClose} animation={false} size="sm"
               dialogClassName={styles.sidebarDialog} contentClassName={styles.sidebarContent}>
            <Modal.Header closeButton>
                <Modal.Title>Change background</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {[...Array(10)].map(() =>
                    <svg className="bd-placeholder-img m-3" width="100" height="100"
                         xmlns="http://www.w3.org/2000/svg" role="img"
                         aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"
                         focusable="false"><title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#55595c"/>
                        <text x="30%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                    </svg>)}
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
        {/*
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
             activeKey="/home"
             onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        >
            <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
                </Nav.Link>
            </Nav.Item>
        </Nav>
        */}
        <style jsx>{`
        /* TODO figure out sidebar transition */
        .fade .modal-dialog {
            right: -320px;
            transition: opacity 0.3s linear, right 0.3s ease-out;
        }
        .modal-backdrop.show {
            opacity: 0.3;
        }
        `}</style>
    </>);
};

export default Sidebar;