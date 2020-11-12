import React from 'react';

export default class Pin extends React.Component {
    componentDidMount() {
    }

    render() {
        const imageSource = `https://placeimg.com/${this.props.id % 2 ? '400/200' : '200/200'}/all?${this.props.id}`;
        return (
            <div className="card shadow-sm board-item">
                <img src={imageSource} className="bd-placeholder-img card-img-top" width="100%" />

                <div className="card-body">
                    <p className="card-text">This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a little bit
                        longer.</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button"
                                    className="btn btn-sm btn-outline-secondary">View
                            </button>
                            <button type="button"
                                    className="btn btn-sm btn-outline-secondary">Edit
                            </button>
                        </div>
                        <small className="text-muted">{this.props.id + 1} mins</small>
                    </div>
                </div>
            </div>
        );
    }
}