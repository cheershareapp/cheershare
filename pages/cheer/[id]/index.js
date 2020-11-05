import React from "react";
import { useRouter } from 'next/router'
import Pin from "../../../components/pin";
import Header from "../../../components/header";

export default class Editor extends React.Component {
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
                    // this.serializeLayout();
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
                {/*row-cols-1 row-cols-sm-2*/}
                <div className="container">
                <div className="row row-cols-md-3 mb-3">
                    <div className="col board-column">
                        <div className="board-column-container">
                            <div className="board-column-content-wrapper">
                                <div className="board-column-content" ref={this.itemContainers[0]}>
                                    {children.slice(0, 2)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col board-column">
                        <div className="board-column-container">
                            <div className="board-column-content-wrapper">
                                <div className="board-column-content" ref={this.itemContainers[1]}>
                                    {children.slice(2, 3)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col board-column">
                        <div className="board-column-container">
                            <div className="board-column-content-wrapper">
                                <div className="board-column-content" ref={this.itemContainers[2]}>
                                    {children.slice(3, 5)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </>
        );
    }
}