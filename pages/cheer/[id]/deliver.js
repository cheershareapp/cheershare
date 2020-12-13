import Footer from "components/footer";
import Header from "components/header";
import React from "react";
import { useRouter } from 'next/router'
import {Button, Container, Form} from "react-bootstrap";
import BetaNotice from "../../../components/beta-notice";

export default function Deliver() {
    const router = useRouter();

    return (
        <>
            <Header />
            <Container className="min-vh-100">
                <Button className="float-right" variant="link" onClick={() => router.back()}>Back to board</Button>
                <h1 className="mt-3">
                    Deliver
                </h1>

                <h3 className="mt-5">Email</h3>
                <BetaNotice />
                <p className="lead">
                    Share your cheer through an Email message.
                </p>
                <Form className="pb-5">
                    <Form.Label>Email addresses</Form.Label>
                    <Form.Control as="text" placeholder="alice@yahoo.com"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>

                    <Button variant="primary" type="submit" className="mt-3">
                        Send CheerShare
                    </Button>
                </Form>
            </Container>
            <Footer />
        </>
    );
}