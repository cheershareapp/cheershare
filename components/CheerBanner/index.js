import React from 'react';
import {Button, ButtonGroup, Col, Row} from "react-bootstrap";
import Link from "next/link";

function CheerBanner({id, editable, data, setData}) {
    const setTitle = (e) => {
        if (e.keyCode !== 13) return;

        e.target.blur();

        return setData({
            title: e.target.innerText,
        });
    };

    const titleConfig = editable
        ? { contentEditable: true, onKeyDown: setTitle, suppressContentEditableWarning: true}
        : {};

    return (<>
        <Row className="justify-content-md-center my-5"
             style={{height: "6rem"}}>
            <h1 {...titleConfig}>{ data.title }</h1>
        </Row>
        {editable && <Row className="m-2">
            <Col>

                <Link href={`${id}/add`}>
                    <Button variant="primary" size="lg">
                        Add a cheer!
                    </Button>
                </Link>
            </Col>
            <Col className="text-right align-text-bottom">
                <ButtonGroup aria-label="Basic example">

                    <Link href={`${id}?preview`}>
                        <Button variant="secondary">Preview</Button>
                    </Link>
                    <Link href={`${id}/invite`}>
                        <Button variant="secondary">Invite</Button>
                    </Link>
                    <Link href={`${id}/deliver`}>
                        <Button variant="secondary">Deliver</Button>
                    </Link>
                    <Button variant="secondary" onClick={() => setSidebar(true)}>Background</Button>
                    <Button variant="secondary" onClick={() => setSidebar(true)}>Settings</Button>
                </ButtonGroup>
            </Col>
        </Row> }
    </>);
}

export default CheerBanner;