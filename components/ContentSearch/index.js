import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Gallery from "components/Gallery";

export default function SearchPage({ vendor, setMediaUrl }) {
    const [ query, setQuery ] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const { target: form } = e;
        const { elements } = form;
        setQuery(elements.query.value);
    };

    return <Alert className="overflow-auto text-center" style={{maxHeight: "50vh"}} variant="info">
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSearch">
                <InputGroup>
                    <Form.Control
                        placeholder="Search for..."
                        aria-label="Search for..."
                        aria-describedby="basic-addon2"
                        name="query"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" type="submit">Search</Button>
                    </InputGroup.Append>
                </InputGroup>

                <Form.Text className="text-muted text-right">
                    Powered by {vendor}
                </Form.Text>
            </Form.Group>
        </Form>
        <Gallery q={query} vendor={vendor} onImageSelect={setMediaUrl}/>
    </Alert>
}