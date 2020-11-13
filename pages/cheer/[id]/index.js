import React from "react";
import { useRouter } from 'next/router'
import Pin from "../../../components/pin";
import Header from "../../../components/header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import s from "../../../styles/Scratch.module.css"

console.log(s)
export default class Scratch extends React.Component {
    constructor(props) {
        super(props);
        this.itemContainers = [
            React.createRef(),
            React.createRef(),
            React.createRef(),
        ];
        this.board = React.createRef();
        this.dragContainer = React.createRef();
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
                    dragSort: () => {
                        return this.columnGrids;
                    },
                    dragContainer: this.dragContainer.current,
                    dragAutoScroll: {
                        targets: (item) => {
                            return [
                                { element: window, priority: 0 },
                                { element: item.getGrid().getElement().parentNode, priority: 1 },
                            ];
                        }
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
                    // this.columnGrids.forEach(function (grid) {
                    //     grid.refreshItems();
                    // });
                })
                .on('layoutStart', () => {
                    // this.boardGrid.refreshItems().layout();
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
                <div className="drag-container" ref={this.dragContainer}></div>
                <Container fluid>
                <Row className="row-cols-md-3 mb-3">
                    <Col className="board-column">
                        <div className={s.boardColumnContainer}>
                            <div className="board-column-content-wrapper">
                                <div className="board-column-content" ref={this.itemContainers[0]}>
                                    {children.slice(0, 2)}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="board-column">
                        <div className={s.boardColumnContainer}>
                            <div className="board-column-content-wrapper">
                                <div className="board-column-content" ref={this.itemContainers[1]}>
                                    {children.slice(2, 3)}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="board-column">
                        <div className={s.boardColumnContainer}>
                            <div className="board-column-content-wrapper">
                                <div className="board-column-content" ref={this.itemContainers[2]}>
                                    {children.slice(3, 5)}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                {/* TODO Add Sidebar https://stackoverflow.com/a/60482229 */}
                </Container>
                <style global jsx >{`
        .board-column {
          background-color: blue;
        }
      `}</style>
            </>
        );
    }
}