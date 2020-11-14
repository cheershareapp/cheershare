import {useState} from "react";
import {signIn, signOut, useSession} from "next-auth/client";

import Header from "../../../components/header";
import Footer from "../../../components/footer";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from "react-bootstrap/Nav";
import InputGroup from 'react-bootstrap/InputGroup'

const ImagePage = ({ onSelect }) => <Nav variant="tabs" defaultActiveKey="" onSelect={onSelect}>
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

const VideoPage = ({ onSelect }) => <Nav variant="tabs" defaultActiveKey="" onSelect={onSelect}>
    <Nav.Item>
        <Nav.Link eventKey="upload-video">Upload Video</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link eventKey="youtube">From Youtube</Nav.Link>
    </Nav.Item>
</Nav>;

const SearchPage = ({ vendor }) => <Form>
    <Form.Group controlId="formBasicEmail">
        <InputGroup className="mb-3">
            <Form.Control
                placeholder="Search for..."
                aria-label="Search for..."
                aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
                <Button variant="outline-secondary">Search</Button>
            </InputGroup.Append>
        </InputGroup>

        <Form.Text className="text-muted">
            Powered by {vendor}
        </Form.Text>
    </Form.Group>
</Form>

const UploadPage = ({ filetype }) => <>
    Add an {filetype} from your computer or phone
    <Form.File
        label={`Drop your ${filetype} file here`}
        custom
    />
</>

function renderPage(page, setPage) {
    switch(page) {
        case "image": return <ImagePage onSelect={setPage}/>;
        case "video": return <VideoPage onSelect={setPage}/>;
        case "unsplash": return <SearchPage vendor="unsplash"/>;
        case "giphy": return <SearchPage vendor="giphy"/>;
        case "youtube": return <SearchPage vendor="youtube"/>;

        case "upload-image":
        case "upload-video":
            return <UploadPage filetype={page.split('-')[1]}/>;
        default:
            return <></>
    }
}

export default function Add() {
    const [ page, setPage ] = useState('');

    return (<>
        <Header/>

        <Container>
            <div className="py-5">
                <h1>Add a Post</h1>
            </div>
            <Nav defaultActiveKey="" as="ul" onSelect={setPage}>
                <Nav.Item as="li">
                    <Nav.Link eventKey="image">Add Image</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link eventKey="video">Add Video</Nav.Link>
                </Nav.Item>
            </Nav>
            { renderPage(page, setPage) }
            <Form>
                <Form.Control as="textarea" rows={10} />

                <Button variant="primary" type="submit">
                    Post
                </Button>
                <Button variant="link">
                    Discard Post
                </Button>
            </Form>
        </Container>

        <Footer fixed/>
    </>);
}
