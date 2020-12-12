import React, {useState, useRef} from 'react';
import {Card, Button, ButtonGroup} from "react-bootstrap";
import styles from "styles/Editor.module.css"
import {Draggable} from "react-beautiful-dnd";
import fetcher from "../../utils/fetch";

export default function CheerPin ({mediaUrl, id, editable, ownerName, message, index}) {
    const pinMessageEl = useRef(null);
    const [editPinMessage, setEditPinMessage] = useState(false);

    const deletePin = async () => {
        if (!confirm("Are you sure you want to delete this pin!?")) return;

        await fetcher(`/api/pins/${id}`, {
            method: 'DELETE'
        });

        location.reload()
    };

    function saveMessage(e) {
        e.target.blur();

        const newMessage = pinMessageEl.current.innerText;
        setEditPinMessage(false);

        if (newMessage === message) return;

        return fetcher(`/api/pins/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                message: newMessage,
            })
        });
    }

    const editMessage = (e) => {
        e.target.blur();
        setEditPinMessage(true);
        pinMessageEl.current.focus();
    };

    const setMessage = (e) => {
        if (e.keyCode !== 13) return;
        return saveMessage(e);
    };

    const textProps = editable && editPinMessage
        ? { contentEditable: true, onKeyDown: setMessage, suppressContentEditableWarning: true, className: 'bg-warning'}
        : {};

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
                <Card.Text ref={pinMessageEl} {...textProps}>{message}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                    {editable && <ButtonGroup>
                        <Button variant="outline-secondary" onClick={deletePin}>Delete</Button>
                        { !editPinMessage
                            ? <Button variant="outline-secondary" onClick={editMessage}>Edit</Button>
                            : <Button variant="outline-secondary" onClick={saveMessage}>Save</Button>
                        }
                    </ButtonGroup>}

                    <small className="text-muted">{ownerName}</small>
                </div>
            </Card.Body>
        </Card>
        )}
    </Draggable>);
}