import React from "react";
import { useRouter } from 'next/router'
import Pin from "../../../components/pin";
import Header from "../../../components/header";
import styles from "../../../styles/Editor.module.css"
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
                items: '.board-item',
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
                <Container className="board" ref={this.board}>
                    <Row>
                        <Col className="board-column">
                            <div className="board-column-content" ref={this.itemContainers[0]}>
                                <div className="board-item">
                                    <div className="board-item-content"><span>Item #</span>1</div>
                                </div>
                                <div className="board-item">
                                    <div className="board-item-content"><span>Item #</span>2</div>
                                </div>
                                <Pin id={1}/>
                                <Pin id={2}/>

                            </div>
                        </Col>
                        <Col className="board-column">
                            <div className="board-column-content" ref={this.itemContainers[1]}>
                                <Pin id={3}/>
                                <Pin id={4}/>

                            </div>
                        </Col>
                        <Col className="board-column">
                            <div className="board-column-content" ref={this.itemContainers[2]}>
                                <Pin id={5}/>
                                <div className="board-item">
                                    <div className="board-item-content"><span>Item #</span>11</div>
                                </div>
                                <div className="board-item">
                                    <div className="board-item-content"><span>Item #</span>12</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <style global jsx>
                    {`
.board {
    position: relative;
}

.board-column {
    /* background: #f0f0f0; */
    /* TODO - make the height 100% of the screenwidth */    
}
.board-column.muuri-item-releasing {
    z-index: 2;
}
.board-column.muuri-item-dragging {
    z-index: 3;
    cursor: move;
}

/* This is the secret sauce,
   always use a wrapper for setting
   the "overflow: scroll/auto" */
.board-column-content-wrapper {
    position: relative;
    max-height: 300px;
    overflow-y: auto;
}
/* Never ever set "overflow: auto/scroll"
   to the muuri element, stuff will break */
.board-column-content {
    position: relative;
    border: 10px solid transparent;
    min-height: 95px;
}
.board-item {
    position: absolute;
    width: 100%;
    margin: 5px 0;
}
.board-item.muuri-item-placeholder {
  z-index: 9;
  margin: 0;
  opacity: 0.7;
}
.board-item.muuri-item-releasing {
    z-index: 9998;
}

.board-item.muuri-item-dragging {
    z-index: 19999;
    cursor: move;
}
.board-item.muuri-item-hidden {
    z-index: 0;
}
.board-item-content {
    position: relative;
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    font-size: 17px;
    cursor: pointer;
    -webkit-box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);
    box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);
}
@media (max-width: 600px) {
    .board-item-content {
        text-align: center;
    }
    .board-item-content span {
        display: none;
    }
}
`}
                </style>
            </>
        );
    }
}