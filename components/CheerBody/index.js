import React, {useCallback, useEffect, useRef} from 'react';
import {Col, Row} from "react-bootstrap";

import styles from "../../styles/Editor.module.css";

import CheerPin from "../pin";

import groupBy from "../../utils/groupby";
import comparer from "../../utils/diff";
import fetcher from "../../utils/fetch";


function byRow(a, b) {
    return a.rowIndex - b.rowIndex;
}

function CheerBody({id, editable, data}) {
    /* DOM setup */
    const itemContainers = [useRef(), useRef(), useRef()];
    let columnGrids = [];

    const boardRef = useCallback(async (node) => {
        if (!node || columnGrids.length > 0) return;
        const Muuri = (await import('muuri')).default;

        columnGrids = itemContainers.map(async container => new Muuri(container.current, {
            items: '.' + styles.boardItem,
            layoutDuration: 400,
            layoutEasing: 'ease',
            dragReleaseDuration: 400,
            dragReleaseEasing: 'ease',
            dragEnabled: true,
            dragContainer: node,
            dragSort: () => {
                return columnGrids;
            },
            sortData: {
                id: function (item, element) {
                    return parseFloat(element.getAttribute('data-id'));
                }
            },
            dragAutoScroll: {
                targets: (item) => {
                    return [
                        { element: node, priority: 1, axis: Muuri.AutoScroller.AXIS_X },
                        { element: item.getGrid().getElement().parentNode, priority: 1, axis: Muuri.AutoScroller.AXIS_Y },
                    ];
                },
                sortDuringScroll: false,
            },
            dragPlaceholder: {
                enabled: true,
                createElement: (item) => item.getElement().cloneNode(true),
            },
        })
            .on('dragInit', (item) => {
                item.getElement().style.width = item.getWidth() + 'px';
                item.getElement().style.height = item.getHeight() + 'px';
            })
            .on('dragReleaseEnd', (item) => {
                item.getElement().style.width = '';
                item.getElement().style.height = '';
                item.getGrid().refreshItems([item]);

                const serialized = serializeLayout();
                if (!data) debugger;
                const difference = serialized.filter(comparer(data.pins));
                console.log(serialized, difference, 'pin change')

                // TODO mutute pins?
                return fetcher(`/api/boards/${id}/pins`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(difference)
                })
            }));

        try {
            columnGrids = await Promise.all(columnGrids)
        } catch (err) {
            console.error(err);
        }

    }, []);

    const serializeLayout = () => {
        const serialized = columnGrids.map(grid => {
            return grid.getItems().map(item => {
                return item.getElement().getAttribute('data-id');
            })
        })

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
    useEffect(() => {
        columnGrids.forEach((grid) => {
            grid.refreshItems && grid.refreshItems().layout();
        });
    });
    /* end DOM setup */

    /* Children setup */
    const pinsByColumn = groupBy(data.pins, "columnIndex");
    const [col1, col2, col3, col4] = [pinsByColumn[0], pinsByColumn[1], pinsByColumn[2], pinsByColumn[undefined]];
    /* end children setup */


    return (<Row ref={boardRef}>
            <Col className={styles.boardColumn}>
                <div className={styles.boardColumnContent} ref={itemContainers[0]}>
                    {col1 && col1.sort(byRow).map((item, idx) => <CheerPin {...item} key={idx} editable={editable}/>)}
                    {col4 && col4.sort(byRow).map((item, idx) => <CheerPin {...item} key={idx} editable={editable}/>)}
                </div>
            </Col>
            <Col className={styles.boardColumn}>
                <div className={styles.boardColumnContent} ref={itemContainers[1]}>
                    {col2 && col2.sort(byRow).map((item, idx) => <CheerPin {...item} key={idx} editable={editable}/>)}
                </div>
            </Col>
            <Col className={styles.boardColumn}>
                <div className={styles.boardColumnContent} ref={itemContainers[2]}>
                    {col3 && col3.sort(byRow).map((item, idx) => <CheerPin {...item} key={idx} editable={editable}/>)}
                </div>
            </Col>
        <style jsx global>{`
        .muuri-item-placeholder {
            z-index: 9;
            margin: 0;
            opacity: 0.7;
        }
        .muuri-item-releasing {
            z-index: 9998;
        }
        .muuri-item-dragging {
            z-index: 19999;
            cursor: move;
        }
        .muuri-item-hidden {
            z-index: 0;
        }
        `}</style>
    </Row>);
}

export default CheerBody;