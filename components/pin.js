import React from 'react';
import {Card, Button, ButtonGroup} from "react-bootstrap";
import styles from "../styles/Editor.module.css"

export default class Pin extends React.Component {
    componentDidMount() {
    }

    render() {
        console.log(styles);
        const imageSource = `https://placeimg.com/${this.props.id % 2 ? '400/200' : '200/200'}/all?${this.props.id}`;
        return (
            <Card className={`shadow-sm ${styles.boardItem}`}>
                <Card.Img src={imageSource} className="bd-placeholder-img card-img-top" width="100%" />

                <Card.Body>
                    <Card.Text>This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a little bit
                        longer.</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <ButtonGroup className="btn-group">
                            <Button variant="outline-secondary">View
                            </Button>
                            <Button variant="outline-secondary">Edit
                            </Button>
                        </ButtonGroup>
                        <small className="text-muted">{this.props.id + 1} mins</small>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}