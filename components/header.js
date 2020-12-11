import React, {useState} from "react";
import {signIn, signOut, useSession} from "next-auth/client";
import {Container, Navbar, Nav, NavDropdown, Dropdown, DropdownButton, Button} from "react-bootstrap";
import CreateBoardModal from "./create-board";
import Link from "next/link";

export default function Header(props) {
    const [ session, loading ] = useSession();
    const [showModal, setModal] = useState(props.showModal || false);
    const callbackUrl = `https://getcheershare.com/cheer`;

    const signInRedirect = () => signIn(null, { callbackUrl });
    return (
        <header>
            <Navbar bg="light" className="shadow-sm">
                <Container>
                    <Navbar.Brand><Link href="/">CheerShare</Link></Navbar.Brand>
                    <Navbar.Toggle />
                    { !loading && <Navbar.Collapse className="justify-content-end">
                        {!session && <>
                            <Nav.Link onClick={signInRedirect}>Register</Nav.Link>
                            <Button onClick={signInRedirect}>Sign In</Button>
                        </>}

                        {session && <>
                            <Nav.Link href="/cheer" as={Link}>Dashboard</Nav.Link>
                            <Nav.Link onClick={() => setModal(true)}>New Board</Nav.Link>

                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-person-circle"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
                                <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                <path fillRule="evenodd"
                                      d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
                            </svg>
                            <DropdownButton
                                variant="link"
                                menuAlign="right"
                                size="lg"
                                title=""
                            >
                                <Dropdown.Header>{session.user.email || 'Email'}</Dropdown.Header>
                                <Dropdown.Item><Link href="/profile/">Account</Link></Dropdown.Item>
                                <Dropdown.Item eventKey="2">History</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Invite Friend</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => signOut({ callbackUrl: '/' })}>Logout</Dropdown.Item>
                            </DropdownButton>
                        </>}
                    </Navbar.Collapse>}
                </Container>
            </Navbar>
            <CreateBoardModal showModal={showModal} setModal={setModal}/>
        </header>
    )
}
