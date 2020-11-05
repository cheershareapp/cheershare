import Header from "../../components/header";
import Footer from "../../components/footer";
import BoardSummary from "../../components/board-summary";
import {useState} from "react";
// import "bootstrap/js/src/modal";
import CreateBoard from "../../components/create-board";

// import dynamic from "next/dist/next-server/lib/dynamic";
// const modal = dynamic(() => import("bootstrap/js/src/modal"))


export default function ListBoards() {
    const [filter, setFilter] = useState('given');
    const [showModal, setModal] = useState(false);
    return (
        <>
            <Header/>
            <div className="container">
                <div>
                    <button type="button" className={`btn ${ filter === 'given' ? "btn-primary" : "btn-link"}`}
                            onClick={() => setFilter('given')}>
                        Given <span className="badge bg-secondary">3</span>
                    </button>
                    |
                    <button type="button" className={`btn ${ filter === 'received' ? "btn-primary" : "btn-link"}`}
                            onClick={() => setFilter('received')}>
                        Received <span className="badge bg-secondary">1</span>
                    </button>
                    |
                    <button type="button" className="btn btn-link"
                            onClick={() => setModal(true)}  data-toggle="modal" data-target="#exampleModal">
                        New Cheer!
                    </button>
                </div>

                {[...Array( filter === 'given' ? 3 : 1).keys()].map(id =>
                    <BoardSummary id={id} key={id}/>
                )}
            </div>

            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{display: showModal ? "block" : "none"}} tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        {/*<div className="modal-header">*/}
                        {/*    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>*/}
                        {/*    <button type="button" className="btn-close" data-dismiss="modal"*/}
                        {/*            onClick={() => setModal(false)}*/}
                        {/*            aria-label="Close"></button>*/}
                        {/*</div>*/}
                        <div className="modal-body">
                            <CreateBoard/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                 onClick={() => setModal(false)}>Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}