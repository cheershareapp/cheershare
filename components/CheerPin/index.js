import React from 'react';
import {Card, Button, ButtonGroup} from "react-bootstrap";
import styles from "styles/Editor.module.css"
import Image from 'next/image';
import {Draggable} from "react-beautiful-dnd";

export default function CheerPin ({mediaUrl, id, editable, ownerName, message, index}) {
    return (<Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
        <Card className="shadow-sm my-2"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
        >
            { mediaUrl &&
            <Image src={mediaUrl} className="card-img bd-placeholder-img card-img-top" width="100%" height="100%" layout="responsive"/>}
            <Card.Body className={styles.boardItemContent}>
                <Card.Text> {message} </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                    {editable && <ButtonGroup>
                        <Button variant="outline-secondary">Like</Button>
                        <Button variant="outline-secondary">Edit</Button>
                    </ButtonGroup>}

                    <small className="text-muted">{ownerName}</small>
                </div>
            </Card.Body>
        </Card>
        )}
    </Draggable>);
}