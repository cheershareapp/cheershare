import React, {useState, useRef, useEffect, useCallback} from "react";
import {useRouter} from 'next/router'
import CheerPin from "../../../components/pin";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Sidebar from "../../../components/sidebar";
import styles from "../../../styles/Editor.module.css"
import { ButtonGroup, Button, Row, Col, Container} from "react-bootstrap";
import Link from "next/link";
import dbConnect from "../../../utils/db";
import groupBy from "../../../utils/groupby";
import Board from "../../../models/Board";
import Pin from "../../../models/Pin";
import useSWR, { mutate } from "swr";
import fetcher from "../../../utils/fetch";

/*
References
https://codepen.io/niklasramo/pen/RJmBVV
https://github.com/haltu/muuri/blob/gh-pages/js/demo-kanban.js
https://github.com/haltu/muuri/blob/gh-pages/css/demo-kanban.css
 */

export default function Editor({ data: initialData }) {
    const itemContainers = [useRef(), useRef(), useRef()];
    let columnGrids = [];

    const boardRef = useCallback(async (node) => {
        if (!node) return;
        const Muuri = (await import('muuri')).default;

        columnGrids = itemContainers.map((container) => {
            return new Muuri(container.current, {
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
                    console.log(serialized, 'dragReleased')
                });
        });
    }, []);

    const serializeLayout = () => {
        return columnGrids.map(grid => {
            return grid.getItems().map(item => {
                return item.getElement().getAttribute('data-id')
            })
        })
    };
    // useEffect(() => {
    //     columnGrids.forEach(function (grid) {
    //         grid.refreshItems();
    //         grid.layout();
    //     });
    // });
    const router = useRouter();

    const { id } = router.query;

    const { data: serverData, error, mutate } = useSWR(`/api/boards/${id}`, fetcher, initialData);
    // shouldRevalidate = false

    const [sidebar, setSidebar] = useState(false);
    const [data, _setData] = useState(initialData);

    if (!serverData) return <></>;

    const setData = async (partial) => {
        _setData({
            ...partial,
            ...data
        });
        return mutate(await fetcher(`/api/boards/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(partial)
        }), false);
    };
    const setTitle = (e) => {
        if (e.keyCode !== 13) return;

        e.target.blur();

        return setData({
            title: e.target.innerText,
        });
    };

    const pinsByColumn = Object.values(groupBy(data.pins, i =>
        i.columnIndex));

    const [col1, col2, col3] = pinsByColumn.map(pins => pins.map((item, idx) =>
        <CheerPin {...item} key={idx}/>
    ));

    // TODO figure out spinner/lazy-loading
    /*
    https://medium.com/evolve-technology/hide-that-da6264a7e1f
    {!this.checkLoaded() && <Spinner animation="border" />}
    className={!this.state.loaded && 'visible'}
     */
    //https://www.kudoboard.com/images/fun-background.png
    return (<>
        <Header/>

        {/*style={{ backgroundImage: `url(${data.backgroundImage})`}}*/}
        <Container className={styles.board} ref={boardRef}>
            <Row className="justify-content-md-center my-5 border-bottom"
                 style={{height: "6rem"}}>
                <h1 contentEditable onKeyDown={setTitle}
                    suppressContentEditableWarning={true}>
                    { data.title }
                </h1>
            </Row>
            {!('preview' in router.query) && <Row className="m-2">
                <Col>

                <Link href={`${id}/add`}>
                    <Button variant="primary" size="lg">
                        Add a cheer!
                    </Button>
                </Link>
                </Col>
                <Col className="text-right align-text-bottom">
                    <ButtonGroup aria-label="Basic example">

                        <Link href={`${id}?preview`}>
                            <Button variant="secondary">Preview</Button>
                        </Link>
                        <Link href={`${id}/invite`}>
                            <Button variant="secondary">Invite</Button>
                        </Link>
                        <Button variant="secondary">Schedule</Button>
                        <Button variant="secondary" onClick={() => setSidebar(true)}>Background</Button>
                        <Button variant="secondary" onClick={() => setSidebar(true)}>Settings</Button>
                    </ButtonGroup>
                </Col>
            </Row> }
            <Row>
                <Col className={styles.boardColumn}>
                    <div className={styles.boardColumnContent} ref={itemContainers[0]}>
                        {col1}
                    </div>
                </Col>
                <Col className={styles.boardColumn}>
                    <div className={styles.boardColumnContent} ref={itemContainers[1]}>
                        {col2}
                    </div>
                </Col>
                <Col className={styles.boardColumn}>
                    <div className={styles.boardColumnContent} ref={itemContainers[2]}>
                        {col3}

                        <div className={styles.boardItem} data-id={1}>
                            <div className={styles.boardItemContent}><span>Item #</span>11</div>
                        </div>
                        <div className={styles.boardItem} data-id={2}>
                            <div className={styles.boardItemContent}><span>Item #</span>12</div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        <Sidebar show={sidebar} setSidebar={setSidebar}/>
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
        <Footer/>
    </>);
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    // const [ session, loading ] = useSession();
    // TODO should be done in API and just import the function here
    await dbConnect();
    const board = await Board.findOne().or([{ _id : id }, { slug: id }]);
    const pins = await Pin.find({ boardId: board.id });

    return {
        props: { data: {
            pins: pins.map(v => v.toJSON()),
            ...board.toJSON()
        } }, // will be passed to the page component as props
    }
}