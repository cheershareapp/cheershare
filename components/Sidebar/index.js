import React from "react";
import Image from "next/image"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from './Sidebar.module.css';
/*
TODO implement directory lookup for all backgrounds
https://medium.com/@boris.poehland.business/next-js-api-routes-how-to-read-files-from-directory-compatible-with-vercel-5fb5837694b9
import fs from 'fs'
import path from 'path'

export default (req, res) => {
  const dirRelativeToPublicFolder = 'img'

  const dir = path.resolve('./public', dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);

  const images = filenames.map(name => path.join('/', dirRelativeToPublicFolder, name))

  res.statusCode = 200
  res.json(images);
}
 */
const backgrounds = [
    "balloons",
    "brick",
    "camouflage",
    "celebration",
    "chevrons",
    "circles",
    "confetti",
    "dots",
    "fabric",
    "feathers",
    "fun"
];
export default function Sidebar ({ show, setSidebar }) {
    const handleClose = () => setSidebar(false);
    const handleShow = () => setSidebar(true);

    return (<>
        <Modal show={show} onHide={handleClose} animation={false} size="sm"
               dialogClassName={styles.sidebarDialog} contentClassName={styles.sidebarContent}>
            <Modal.Header closeButton>
                <Modal.Title>Change background</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {backgrounds.map((name, i) =>
                    <Image src={`/images/${name}-background.png`} width="120" height="120" className="m-3" key={i}/>
                )}
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

/*
export async function getStaticProps(context) {
    const backgrounds = fs.readdirSync('./public/images').filter(file => file.includes('background'));
    console.log(backgrounds, 'sidebar');

    return {
        props: { backgrounds }, // will be passed to the page component as props
    }
}
*/