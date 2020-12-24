import React from 'react';
import {Button, ButtonGroup, Navbar, Row} from "react-bootstrap";
import Link from "next/link";
import {Tiers} from "../../utils/stripeHelper";

function CheerBanner({id, editable, data, setData, setSidebar}) {
    const setTitle = (e) => {
        if (e.keyCode !== 13) return;

        e.target.blur();

        return setData({
            title: e.target.innerText,
        });
    };

    const titleConfig = editable
        ? { contentEditable: true, onKeyDown: setTitle, suppressContentEditableWarning: true }
        : {};
    const MAX_POSTS = Tiers[data.tier || 'mini'].postLimit;

    return (<>
        <Row className="justify-content-md-center my-5 text-center"
             style={{height: "6rem"}}>
            <h1 {...titleConfig} className="w-100">{ data.title }</h1>
        </Row>
        {editable && <Navbar expand="md" className="m-2">
                <Link href={`${id}/add`}>
                    <Button variant="primary" size="lg" disabled={data.pins.length >= MAX_POSTS}>
                        Add a cheer!
                    </Button>
                </Link>
            <Navbar.Toggle aria-controls="editor-toolbar"/>
            <Navbar.Collapse id="editor-toolbar" className="justify-content-end text-right mt-2">
                <ButtonGroup>
                    <Link href={`${id}?preview`}>
                        <Button variant="secondary">Preview</Button>
                    </Link>
                    <Link href={`${id}/invite`}>
                        <Button variant="secondary">Invite</Button>
                    </Link>
                    <Link href={`${id}/upgrade`}>
                        <Button variant="secondary">Upgrade</Button>
                    </Link>
                    <Link href={`${id}/deliver`}>
                        <Button variant="secondary">Deliver</Button>
                    </Link>
                    <Button variant="secondary" onClick={() => setSidebar(true)}>Background</Button>
                </ButtonGroup>
            </Navbar.Collapse>
        </Navbar>
        }
    </>);
}

export default CheerBanner;
