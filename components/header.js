import React, {useState} from "react";
import {signIn, signOut, useSession} from "next-auth/client";
import {Container, Navbar, Nav, NavDropdown, Dropdown, DropdownButton, Button} from "react-bootstrap";
import CreateBoardModal from "./create-board";

function Icon(props) {
    console.log(props)
    return (<Button variant="link" {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                 stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                 aria-hidden="true" className="mr-2" viewBox="0 0 24 24">
        <path
            d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
    </svg>
        {props.children}
    </Button>);
}

export default function Header(props) {
    // const [ session, loading ] = useSession();
    let session = { user: {} };
    const [showModal, setModal] = useState(props.showModal || false);

    return (
        <header>
            <Navbar bg="light" className="shadow-sm">
                <Container>
                    <Navbar.Brand href="#home">CheerShare</Navbar.Brand>
                    {/*    <span className="navbar-toggler-icon"></span>*/}
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link href="#home">Dashboard</Nav.Link>
                        <Nav.Link onClick={() => setModal(true)}>New Board</Nav.Link>
                        {!session &&
                            <Nav.Link>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                     stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                     aria-hidden="true" className="mr-2" viewBox="0 0 24 24">
                                    <path
                                        d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                                    <circle cx="12" cy="13" r="4"/>
                                </svg>
                            </Nav.Link>
                        }

                        {session && <>
                            <DropdownButton
                                variant="link"
                                menuAlign="right"
                                size="lg"
                                title=""
                            >
                                <Dropdown.Header>{session.user.email || 'Email'}</Dropdown.Header>
                                <Dropdown.Item eventKey="1">Account</Dropdown.Item>
                                <Dropdown.Item eventKey="2">History</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Invite Friend</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="4">Logout</Dropdown.Item>
                            </DropdownButton>
                        </>}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CreateBoardModal showModal={showModal} setModal={setModal}/>
        </header>
    )
}
