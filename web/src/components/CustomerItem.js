import React from 'react';
import {ListGroup} from 'react-bootstrap';

function CustomerItem(props) {
    const {onSelect, customerNumber, customerName, active} = props;

    return (
        <ListGroup.Item onClick={() => onSelect(customerNumber)} action active={active}>
            {customerName}
        </ListGroup.Item>
    );
}

export default CustomerItem;