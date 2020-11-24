import React from 'react';
import {Card, Button, ButtonGroup} from "react-bootstrap";
import styles from "../styles/Editor.module.css"
import Image from 'next/image';

export default class CheerPin extends React.Component {
    componentDidMount() {
    }

    render() {
        const imageSource = this.props.mediaUrl;
        return (
            <div className={styles.boardItem} data-id={this.props.id}>
            <Card className="shadow-sm">
                {/*<Card.Img src={imageSource} className="bd-placeholder-img card-img-top" width="100%"/>*/}
                { imageSource &&
                <Image src={imageSource} className="card-img bd-placeholder-img card-img-top" width="100%" height="100%" layout="responsive"/>}
                <Card.Body className={styles.boardItemContent}>
                    <Card.Text> {this.props.message} </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <ButtonGroup>
                            <Button variant="outline-secondary">Like</Button>
                            <Button variant="outline-secondary">Edit</Button>
                        </ButtonGroup>
                        <small className="text-muted">{this.props.likeCount || 1} likes</small>
                    </div>
                </Card.Body>
            </Card>
            </div>
        );
    }
}