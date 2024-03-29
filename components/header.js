import React, {useState} from "react";
import {signIn, signOut, useSession} from "next-auth/client";
import {Container, Navbar, Nav, Dropdown, DropdownButton, Button, Image} from "react-bootstrap";
import CreateBoardModal from "./CreateBoard";
import Link from "next/link";

export default function Header({ showModal: _showModal, className, index }) {
    const [ session, loading ] = useSession();
    const [showModal, setModal] = useState(_showModal || false);
    const callbackUrl = `https://getcheershare.com/cheer`;

    const signInRedirect = () => signIn(null, { callbackUrl });
    return (
        <header>
            <Navbar className={`shadow-sm ${className}`} expand="md">
                <Container>
                    <Navbar.Brand><Link href="/">
                        <img src="/Logo.svg" height="24" alt="CheerShare Logo" style={{marginTop: -8}}/>
                    </Link></Navbar.Brand>

                    <Navbar.Toggle />

                    <Navbar.Collapse className="justify-content-end">
                    { index && <Nav className="mr-auto">
                        <Nav.Link href="/#how-it-works">How it works</Nav.Link>
                        <Nav.Link href="/pricing">Pricing</Nav.Link>
                        <Nav.Link href={`${callbackUrl}/5fd1a8b788449c70ecccda24`}>Try a demo</Nav.Link>
                    </Nav>}

                    { !loading && <>
                        {!session && <>
                            <Nav.Link onClick={signInRedirect}>Register</Nav.Link>
                            <Button onClick={signInRedirect}>Sign In</Button>
                        </>}

                        {session && <>
                            <Nav.Link href="/cheer" as={Link}>Dashboard</Nav.Link>
                            <Nav.Link onClick={() => setModal(true)}>New Board</Nav.Link>

                            { 'image' in session.user ?
                                <Image src={session.user.image} roundedCircle style={{width:"2.5em", height:"2.5em"}}/> :
                                (<svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-person-circle"
                                      fill="currentColor" xmlns="http://www.w3.org/2000/svg" alt="User profile image">
                                    <path
                                        d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
                                    <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    <path fillRule="evenodd"
                                          d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
                                </svg>)
                            }
                            <DropdownButton
                                variant="link"
                                menuAlign="right"
                                size="lg"
                                title=""
                            >
                                <Dropdown.Header>{session.user.email || 'Email'}</Dropdown.Header>
                                <Dropdown.Item href="/profile/"><Link href="/profile/">Account</Link></Dropdown.Item>
                                <Dropdown.Item eventKey="2">History</Dropdown.Item>
                                <Dropdown.Item href="/cheer/5fd1a8b788449c70ecccda24/invite">Invite Friend</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => signOut({ callbackUrl: '/' })}>Logout</Dropdown.Item>
                            </DropdownButton>
                        </>}
                    </>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CreateBoardModal showModal={showModal} setModal={setModal}/>
        </header>
    )
}
