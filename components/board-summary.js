import {Row, Col, Media, Button, ButtonGroup, ListGroup, Form, Container} from "react-bootstrap";
import React from "react";
import Link from "next/link";

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const DAY = 24 * 60 * 60 * 60 * 1000;

export default function BoardSummary({id, recipientFirstName: firstName, recipientLastName: lastName, title, pinCount, updatedAt, createdAt}) {
    const elapsed = +new Date() - updatedAt;
    const timeAgo = rtf.format(Math.round(elapsed/DAY), 'day');
    const createdAtDate = new Date(createdAt);
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
            <Form>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column="true" sm="2">
                        FOR
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control plaintext readOnly defaultValue={`${firstName} ${lastName}`} />
                    </Col>

                    <Form.Label column="true" sm="3" className="text-right">
                        <p>POSTS (Max of 10) </p>
                    </Form.Label>
                    <Col>
                        <Form.Control plaintext readOnly defaultValue={`${pinCount} of 10`}/>
                        <Link href={`/cheer/${id}/upgrade`}>Upgrade MINI BOARD</Link>
                    </Col>
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
                        <Form.Control plaintext readOnly defaultValue={createdAtDate.toDateString()}/>
                    </Col>
                </Form.Group>
            </Form>

            <div className="d-flex justify-content-between align-items-center">
                <ButtonGroup>
                    <Link href={`/cheer/${id}/invite`}>
                        <Button variant="outline-secondary" size="sm">Invite</Button>
                    </Link>
                    <Link href={`/cheer/${id}`}>
                        <Button variant="outline-secondary" size="sm">Edit</Button>
                    </Link>
                </ButtonGroup>
                <small className="text-muted">LAST POST ADDED {timeAgo}</small>
            </div>
        </Media.Body>
    </Media>);
}