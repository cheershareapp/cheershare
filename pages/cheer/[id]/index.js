import React from "react";
import { withRouter } from 'next/router'
import Pin from "../../../components/pin";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import styles from "../../../styles/Editor.module.css"
import { ButtonGroup, Button, Row, Col, Container} from "react-bootstrap";
import Link from "next/link";

/*
References
https://codepen.io/niklasramo/pen/RJmBVV
https://github.com/haltu/muuri/blob/gh-pages/js/demo-kanban.js
https://github.com/haltu/muuri/blob/gh-pages/css/demo-kanban.css
 */

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.itemContainers = [
            React.createRef(),
            React.createRef(),
            React.createRef(),
        ];
        this.board = React.createRef();
        this.incrementLoading = this.incrementLoading.bind(this);
        this.state = { loading: 0, loaded: false }
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
                    // this.columnGrids.forEach(function (grid) {
                    //     grid.refreshItems();
                    // });
                });
        });
    }

    incrementLoading() {
        this.setState({ loading: this.state.loading + 1 });

        if (this.checkLoaded()) {
            this.columnGrids.forEach((grid) => {
                grid.refreshItems();
                grid.layout();
            });
            console.log("loading is done")
            // this.setState({loaded: true});
        }
    }

    checkLoaded() {
        // TODO figure out the router on refresh
        /* const router = this.props.router;
           let {id} = router.query;
           return this.state.loading === 4 && !!id;
        */
        return this.state.loading === 4;
    }

    render() {
        const router = this.props.router;
        const id = 0;
        const [p1, p2, p3, p4, p5] = [...Array(5).keys()].map(i =>
            <Pin id={id+i} key={id+i} onImageLoad={this.incrementLoading}/>
        );

        // TODO figure out spinner/lazy-loading
        /*
        https://medium.com/evolve-technology/hide-that-da6264a7e1f
        {!this.checkLoaded() && <Spinner animation="border" />}
        className={!this.state.loaded && 'visible'}
         */
        return (
            <>
                <Header/>
                <Container className={styles.board} ref={this.board} style={{ backgroundImage: "url(https://www.kudoboard.com/images/fun-background.png)"}}>
                    <Row className="justify-content-md-center my-5 border-bottom bg-danger"
                         style={{height: "6rem"}}>
                        <h1>Happy Cheer-aversary</h1>
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
                                <Button variant="secondary">Background</Button>
                                <Button variant="secondary">Settings</Button>
                            </ButtonGroup>
                        </Col>
                    </Row> }
                    <Row>
                        <Col className={styles.boardColumn}>
                            <div className={styles.boardColumnContent} ref={this.itemContainers[0]}>
                                {p1}
                                {p2}
                            </div>
                        </Col>
                        <Col className={styles.boardColumn}>
                            <div className={styles.boardColumnContent} ref={this.itemContainers[1]}>
                                {p3}
                            </div>
                        </Col>
                        <Col className={styles.boardColumn}>
                            <div className={styles.boardColumnContent} ref={this.itemContainers[2]}>
                                {p4}
                                {p5}

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
export default withRouter(Editor);