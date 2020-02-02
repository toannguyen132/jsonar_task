import React from 'react';
import {Spinner as BootstrapSpinner} from 'react-bootstrap';

function Spinner() {
    return (
        <BootstrapSpinner animation="border" role="status"/>
    );
}

export default Spinner;