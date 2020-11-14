import React, {useState} from "react";
import {signIn, signOut, useSession} from "next-auth/client";

import Header from "../../../components/header";
import Footer from "../../../components/footer";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from "react-bootstrap/Nav";
import InputGroup from 'react-bootstrap/InputGroup'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Alert from "react-bootstrap/Alert";
import {useRouter} from "next/router";

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

const SearchPage = ({ vendor }) => <><Form>
    <Form.Group controlId="formSearch">
        <InputGroup>
            <Form.Control
                placeholder="Search for..."
                aria-label="Search for..."
                aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
                <Button variant="outline-secondary">Search</Button>
            </InputGroup.Append>
        </InputGroup>

        <Form.Text className="text-muted text-right">
            Powered by {vendor}
        </Form.Text>
    </Form.Group>
</Form>
    <Alert className="overflow-auto text-center" style={{maxHeight: "30vh"}} variant="info">
        {[...Array(10)].map(() =>
        <svg className="bd-placeholder-img m-3" width="200" height="200"
             xmlns="http://www.w3.org/2000/svg" role="img"
             aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"
             focusable="false"><title>Placeholder</title>
            <rect width="100%" height="100%" fill="#55595c"/>
            <text x="30%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
        </svg>)}
    </Alert>
</>

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

function renderPage(page, setPage) {
    switch (page) {
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
    const router = useRouter()

    return (<>
        <Header/>

        <Container>
            <div className="py-5">
                <h1>Add a Post</h1>
            </div>
            <Tabs defaultActiveKey="" variant="pills" onSelect={setPage}>
                <Tab eventKey="image" title="Add Image">
                    <ImagePage onSelect={setPage}/>
                </Tab>
                <Tab eventKey="video" title="Add Video">
                    <VideoPage onSelect={setPage}/>
                </Tab>
            </Tabs>
            { renderPage(page, setPage) }
            <Form>
                <Form.Control as="textarea" rows={10} />

                <Button variant="primary" type="submit">
                    Post
                </Button>
                <Button variant="link" onClick={() => router.back()}>
                    Discard Post
                </Button>
            </Form>
        </Container>

        <Footer fixed/>
    </>);
}
