import React, {useState} from "react";
import {getSession} from "next-auth/client";
import {useRouter} from "next/router";
import { mutate } from "swr"

import Header from "components/header";
import Footer from "components/footer";
import ContentSearch from "components/ContentSearch";

import { Container, Button, Form, Nav, Tab, Tabs, Alert } from "react-bootstrap";

import {redirectToLogin} from "utils/redirectToLogin";
import fetcher from "utils/fetch";
import dbConnect from "utils/db";

import Board from "models/Board";


// maybe use React Portal?
const ImagePage = ({ onSelect }) => <Nav defaultActiveKey="" onSelect={onSelect}>
    <Nav.Item>
        <Nav.Link eventKey="upload-image">Upload Image</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link eventKey="unsplash">From Unsplash</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link eventKey="giphy">From GIPHY</Nav.Link>
    </Nav.Item>
</Nav>;

const VideoPage = ({ onSelect }) => <Nav defaultActiveKey="" onSelect={onSelect}>
    <Nav.Item>
        <Nav.Link eventKey="upload-video">Upload Video</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link eventKey="youtube">From Youtube</Nav.Link>
    </Nav.Item>
</Nav>;


const UploadPage = ({ filetype }) => <Form className="min-vh-20">
    Add an {filetype} from your computer or phone
    <Alert style={{minHeight: "15vh"}} className="text-center" variant="success">
        <h5>Drop your {filetype} file here</h5>
        <hr />
        <Form.File id="formcheck-api-custom" custom className="my-4">
            <Form.File.Label data-browse="Button text">
            </Form.File.Label>
            <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
        </Form.File>
    </Alert>
</Form>

function renderPage(page, setMediaUrl) {
    switch (page) {
        case "unsplash": return <SearchPage vendor="unsplash" setMediaUrl={setMediaUrl}/>;
        case "giphy": return <SearchPage vendor="giphy" setMediaUrl={setMediaUrl}/>;
        case "youtube": return <SearchPage vendor="youtube" setMediaUrl={setMediaUrl}/>;

        case "upload-image":
        case "upload-video":
            return <UploadPage filetype={page.split('-')[1]}/>;
        default:
            return <></>
    }
}

export default function Add({ data: board }) {
    const [ page, _setPage ] = useState('');
    const [ mediaUrl, setMediaUrl ] = useState('');
    const router = useRouter();
    const { id: boardId } = router.query;

    const setPage = (newPage) => {
        _setPage(newPage === page ? '' : newPage)
    };

    const handleSelectImage = (url) => {
        setMediaUrl(url);
        _setPage('');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { target: formEl } = e;
        const { elements } = formEl;

        const newPin = {
            message: elements.message.value,
            boardId,
            mediaUrl,
        };

        const { pins, ...rest } = board;
        const newPinBody = await fetcher(`/api/boards/${boardId}/pins`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPin)
        });
        await mutate(`/api/boards/${boardId}`, {
            pins: [...pins, newPinBody],
            ...rest,
        }, true);
        return router.back(); // push(`cheer/${boardId}`);
    };

    return (<>
        <Header/>

        <Container className="min-vh-100">
            <div className="py-3">
                <Button variant="link" onClick={() => router.back()} className="float-right">
                    Back to board
                </Button>
                <h1>Add a Post</h1>
            </div>
            <Tabs activeKey={page} variant="pills" className="pb-2" onSelect={setPage}>
                <Tab eventKey="image" title="Add Unsplash Image">
                    <ContentSearch vendor="unsplash" setMediaUrl={handleSelectImage}/>
                </Tab>
                <Tab eventKey="video" title="Add Giphy GIF">
                    <ContentSearch vendor="giphy" setMediaUrl={handleSelectImage}/>
                </Tab>
            </Tabs>
            { mediaUrl && <img src={mediaUrl} className="py-2"/> }
            <Form onSubmit={handleFormSubmit} className="py-2">
                <Form.Control as="textarea" rows={10} name="message" placeholder="Message..."/>

                <Button variant="primary" type="submit" className="mb-5">
                    Post
                </Button>
            </Form>
        </Container>

        <Footer/>
    </>);
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const session = await getSession(context);

    if (!session) {
        return redirectToLogin(`/cheer/${id}`, context.res);
    }
    await dbConnect();
    const data = await Board.index({_id: id}, { nestPins: true });
    return {
        props: { data: data[0] }, // will be passed to the page component as props
    }
}
