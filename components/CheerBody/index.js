import React, {useCallback, useEffect, useRef} from 'react';
import {Col, Row} from "react-bootstrap";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { mutate } from "swr";

import styles from "styles/Editor.module.css";
import CheerList from "components/CheerList";
import groupBy from "utils/groupby";
import comparer from "utils/diff";
import fetcher from "utils/fetch";


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

function CheerBody({id, editable, data}) {
    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        let layout = {};

        if (source.droppableId === destination.droppableId) {
            layout[source.droppableId] = reorder(
                cols[source.droppableId],
                source.index,
                destination.index
            );
        } else {
            layout = move(
                cols[source.droppableId],
                cols[destination.droppableId],
                source,
                destination
            );
        }

        const serialized = serializeLayout(layout);
        const difference = serialized.filter(comparer(data.pins));

        const lookup = Object.fromEntries(difference.map(i => [i.id, i]));
        const newPins = data.pins.map(p => ({
            ...p,
            ...(lookup[p.id] || {})
        }));

        mutate(`/api/boards/${id}`, async (board) => ({
            ...board,
            pins: newPins,
        }));

        return fetcher(`/api/boards/${id}/pins`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(difference)
        })
    };

    const serializeLayout = (serialized) => {
        return Object.entries(serialized)
            .map(([columnIndex, col]) => {
                return col.map(({id}, rowIndex) => {
                    return {
                        id,
                        rowIndex,
                        columnIndex: parseInt(columnIndex)
                    };
                })
            }).flat();
    };

    // put the pins into columns
    const pinsByColumn = groupBy(data.pins, "columnIndex");

    // if we have any misplaced pins join them to the first column
    const cols = [0, 1, 2, undefined].map(i => pinsByColumn[i] || []);
    cols[0] = cols[0].concat(cols.pop());

    return (<DragDropContext onDragEnd={onDragEnd}><Row>
        {cols.map((col, index) =>
            <Droppable droppableId={index.toString()} className={styles.boardColumn} key={index}>
                {provided => (
                    <Col className={styles.boardColumn} ref={provided.innerRef} {...provided.droppableProps}>
                        <CheerList data={col} editable={editable}>
                            {provided.placeholder}
                        </CheerList>
                    </Col>
                )}
            </Droppable>
        )}
    </Row></DragDropContext>);
}

export default CheerBody;