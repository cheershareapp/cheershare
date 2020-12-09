import {useState} from "react";
import {useSession} from "next-auth/client";

import Header from "../components/header";
import Footer from "../components/footer";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {redirectToLogin} from "../utils/redirectToLogin";

export default function Profile() {
    const [ session, loading ] = useSession();

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null

    // If no session exists, display access denied message
    if (typeof window !== 'undefined' && !session) {
        redirectToLogin();
    }
    return (
        <>
            <Header/>

            <Container>
                <div className="py-5">
                <h1>My Profile</h1>
                </div>
                <pre>{JSON.stringify(session, null, 4)}</pre>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>

            <Footer/>
        </>
    );
}
