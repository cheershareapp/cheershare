import {Row, Col, Media, Button, ButtonGroup, ListGroup, Form, Container} from "react-bootstrap";
import React from "react";
import Link from "next/link";

export default function BoardSummary({id, recipientFirstName: firstName, recipientLastName: lastName, title}) {
    return (<Media>
        <Link href={`/cheer/${id}`}>
        <svg className="bd-placeholder-img mr-3" width="200" height="200"
             xmlns="http://www.w3.org/2000/svg" role="img"
             aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"
             focusable="false"><title>Placeholder</title>
            <rect width="100%" height="100%" fill="#55595c"/>
            <text x="30%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
        </svg>
        </Link>

        <Media.Body>
            <h4>{title}</h4>
            {/*<Container>*/}
            {/*    <Row>*/}
            {/*        <Col xs={7}>*/}
            {/*            <label>For</label>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Container>*/}
            <Form>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column="true" sm="2">
                        FOR
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control plaintext readOnly defaultValue={`${firstName} ${lastName}`} />
                    </Col>

                    <Form.Text column="true" sm="4" className="text-right">
                        MINI BOARD
                    </Form.Text>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column="true" sm="2">
                        CREATOR
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control plaintext readOnly defaultValue="Sid Ghodke" />
                    </Col>

                    <Form.Label column="true" sm="3" className="text-right">
                        CREATED
                    </Form.Label>
                    <Col>
                        <Form.Control plaintext readOnly defaultValue="October 30, 2020"/>
                    </Col>
                </Form.Group>
            </Form>

            <Link href={`/cheer/${id}/upgrade`}>POSTS Upgrade 4 (Max of 10)</Link>
            <div className="d-flex justify-content-between align-items-center">
                <ButtonGroup>
                    <Button href={`/cheer/${id}/invite`} variant="outline-secondary" size="sm" as={Link}>Invite</Button>
                    <Button href={`/cheer/${id}`} variant="outline-secondary" size="sm" as={Link}>Edit</Button>
                </ButtonGroup>
                <small className="text-muted">LAST POST ADDED 3 days ago</small>
            </div>
        </Media.Body>
    </Media>);
}