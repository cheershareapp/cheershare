import Footer from "components/footer";
import Header from "components/header";
import React from "react";
import { useRouter } from 'next/router'
import {Button, Container, Form} from "react-bootstrap";
import BetaNotice from "components/beta-notice";

export default function Invite() {
    const router = useRouter();

    // Slice out '/invite' from the end of the path
    const shareableLink = `https://getcheershare.com${router.asPath}`.slice(0, -7);

    return (
        <>
            <Header />
            <Container className="min-vh-100">
                <h1 className="mt-3">
                    Invite Contributors
                    {/*<small className="text-muted">Everyone can add their cheer</small>*/}
                    <Button className="float-right" variant="link" onClick={() => router.back()}>Back to board</Button>
                </h1>

                <h3 className="mt-5">Link</h3>
                <p className="lead">
                    Copy/paste the URL below. It will take folks directly to the CheerShare to contribute.
                </p>
                <Form.Control type="text" placeholder="URL" value={shareableLink}/>

                <h3 className="mt-5">Facebook</h3>
                <BetaNotice />
                <p className="lead">
                    Send the invite through a Facebook message.
                </p>
                <Button>Go to Facebook</Button>

                <h3 className="mt-5">Email</h3>
                <BetaNotice />
                <p className="lead">
                    Send the invite through an Email message.
                </p>
                <Form className="pb-5">
                    <Form.Label>Email addresses</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="alice@yahoo.com, bob@gmail.com, clarie@msn.com"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>

                    <Button variant="primary" type="submit">
                        Send invites
                    </Button>
                </Form>
            </Container>
            <Footer />
        </>
    );
}