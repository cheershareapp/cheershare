export default function BoardSummary({id}) {
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h3>You're Amazing!</h3>
                <p className="card-text">
                    FOR  Abby Hall
                    MINI BOARD
                    CREATOR Sid Ghodke
                    CREATED October 30, 2020
                </p>
                <a href={`/cheer/${id}/upgrade`}>POSTS Upgrade 4 (Max of 10)</a>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <a href={`/cheer/${id}/invite`}
                                className="btn btn-sm btn-outline-secondary">View
                        </a>
                        <a href={`/cheer/${id}`}
                                className="btn btn-sm btn-outline-secondary">Edit
                        </a>
                    </div>
                    <small className="text-muted">LAST POST ADDED 3 days ago</small>
                </div>
            </div>
        </div>
    );
}