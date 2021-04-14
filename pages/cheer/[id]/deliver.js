import React, {useState} from "react";
import { useRouter } from 'next/router'
import {Alert, Button, Container, Form} from "react-bootstrap";

import fetcher from "utils/fetch";
import Footer from "components/footer";
import Header from "components/header";
import BetaNotice from "components/beta-notice";

const ErrorNotice = ({message}) => <Alert variant="danger">
    <p className="mt-2"><strong>Grr! Delivery Failed</strong></p>
    <p className="fw-normal">{message}</p>
</Alert>;

export default function Deliver() {
    const router = useRouter();
    const [error, setError] = useState('');
    const { id } = router.query;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { target: form } = e;
        const { elements } = form;

        const deliveryProps = {
            recipientEmail: elements.recipientEmail.value.trim(),
        };

        const resp = await fetcher(`/api/boards/${id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(deliveryProps)
        });

        if (resp.success) {
            return router.push(`/cheer/${id}?delivered`)
        }
        if (error in resp) {
            setError(resp.error);
        }
    };

    return (<>
        <Header />
        <Container className="min-vh-100">
            <Button className="float-right" variant="link" onClick={() => router.back()}>Back to board</Button>
            <h1 className="mt-3">
                Deliver
            </h1>

            <h3 className="mt-5">Email</h3>
            { error.length > 0 && <ErrorNotice message={error} />}
            <p className="lead">
                Share your cheer through an Email message.
            </p>
            <Form className="pb-5" onSubmit={handleSubmit}>
                <Form.Label>Email addresses</Form.Label>
                <Form.Control type="email" placeholder="alice@yahoo.com" name="recipientEmail"/>
                <Form.Text className="text-muted">
                    We'll never share this email with anyone.
                </Form.Text>

                <Button variant="primary" type="submit" className="mt-3">
                    Send CheerShare
                </Button>
            </Form>
        </Container>
        <Footer />
    </>);
}
