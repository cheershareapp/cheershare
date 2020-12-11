import React, {useCallback, useEffect, useRef} from 'react';
import {Col, Row} from "react-bootstrap";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import styles from "styles/Editor.module.css";
import CheerList from "components/CheerList";
import groupBy from "utils/groupby";
import comparer from "utils/diff";
import fetcher from "utils/fetch";


function CheerBody({id, editable, data}) {
    const onDragEnd = (item) => {
        const serialized = serializeLayout();
        const difference = serialized.filter(comparer(data.pins));

        // TODO mutute pins?
        return fetcher(`/api/boards/${id}/pins`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(difference)
        })
    };

    const serializeLayout = () => {
        /*
        const serialized = columnGrids.map(grid => {
            return grid.getItems().map(item => {
                return item.getElement().getAttribute('data-id');
            })
        });
         */
        const serialized = [];

        return serialized.map((col, columnIndex) => {
            return col.map((id, rowIndex) => {
                return {
                    id,
                    rowIndex,
                    columnIndex
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