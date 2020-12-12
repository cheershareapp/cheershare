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
            <Card.Img src={mediaUrl}/>}
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