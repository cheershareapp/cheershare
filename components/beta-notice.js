import {Alert} from "react-bootstrap";
import React from "react";

const BetaNotice = () => <Alert variant="info">
    <p className="mt-2"><strong>Feature is in Beta</strong></p>
    <p className="fw-normal">We thank you for your patience as we build Cheershare!</p>
</Alert>;

export default BetaNotice;