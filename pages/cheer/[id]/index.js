import React from "react";
import { useRouter } from 'next/router'
import Pin from "../../../components/pin";
import Header from "../../../components/header";
import styles from "../../../styles/Editor.module.css"
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Footer from "../../../components/footer";

/*
References
https://codepen.io/niklasramo/pen/RJmBVV
https://github.com/haltu/muuri/blob/gh-pages/js/demo-kanban.js
https://github.com/haltu/muuri/blob/gh-pages/css/demo-kanban.css
 */

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.itemContainers = [
            React.createRef(),
            React.createRef(),
            React.createRef(),
        ];
        this.board = React.createRef();
    }

    async componentDidMount() {
        const Muuri = (await import('muuri')).default;

        this.columnGrids = this.itemContainers.map((container) => {
            return new Muuri(container.current, {
                items: '.' + styles.boardItem,
                layoutDuration: 400,
                layoutEasing: 'ease',
                dragReleaseDuration: 400,
                dragReleaseEasing: 'ease',
                dragEnabled: true,
                dragContainer: this.board.current,
                dragSort: () => {
                    return this.columnGrids;
                },
                dragAutoScroll: {
                    targets: (item) => {
                        return [
                            { element: this.board.current, priority: 1, axis: Muuri.AutoScroller.AXIS_X },
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
                .on('dragInit', function (item) {
                    item.getElement().style.width = item.getWidth() + 'px';
                    item.getElement().style.height = item.getHeight() + 'px';
                })
                .on('dragReleaseEnd', (item) => {
                    item.getElement().style.width = '';
                    item.getElement().style.height = '';
                    item.getGrid().refreshItems([item]);
                    // TODO serializeLayout() -> API call
                    this.columnGrids.forEach(function (grid) {
                        grid.refreshItems();
                    });
                });
        });
    }

    render() {
        // const router = useRouter();
        // const {id} = router.query;
        //<strong> {id} </strong>
        const children = [...Array(5).keys()].map(id => <Pin id={id} key={id}/>);
        return (
            <>
                <Header/>
                <Container className={styles.board} ref={this.board}>
                    <Row>
                        <Col className={styles.boardColumn}>
                            <div className={styles.boardColumnContent} ref={this.itemContainers[0]}>
                                <Pin id={1}/>
                                <Pin id={2}/>
                            </div>
                        </Col>
                        <Col className={styles.boardColumn}>
                            <div className={styles.boardColumnContent} ref={this.itemContainers[1]}>
                                <Pin id={3}/>
                                <Pin id={4}/>
                            </div>
                        </Col>
                        <Col className={styles.boardColumn}>
                            <div className={styles.boardColumnContent} ref={this.itemContainers[2]}>
                                <Pin id={5}/>
                                <div className={styles.boardItem}>
                                    <div className={styles.boardItemContent}><span>Item #</span>11</div>
                                </div>
                                <div className={styles.boardItem}>
                                    <div className={styles.boardItemContent}><span>Item #</span>12</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
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
            </>
        );
    }
}