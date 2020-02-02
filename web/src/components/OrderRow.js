import React, {useState} from 'react';
import {Accordion, Card, Button, Table} from 'react-bootstrap';
import { fetchOrderDetails } from '../utils/service';
import Spinner from './Spinner'


function OrderRow(props) {
    const {order, customerId} = props;
    const {orderNumber, orderDate} = order;
    const [orderDetails, setOrderDetails] = useState([]);
    const [fetched, setFecthed] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFetch = () => {
        if (!fetched) {
            setLoading(true);
            fetchOrderDetails(customerId, order.orderNumber)
            .then(list => {
                setFecthed(true);
                setOrderDetails(list);
            })
            .finally(() => {
                setLoading(false);
            })
        }
    }

    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as="div" variant="link" eventKey={orderNumber}>
                    <Button variant="link" onClick={onFetch}>
                        Order <strong>#{orderNumber}</strong>, Date: {orderDate}
                    </Button>
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={orderNumber}>
                <Card.Body>
                    {loading ? 
                        <div className="text-center"><Spinner /></div> :
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Unit Price</th>
                                    <th className="text-right">Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.map(detail => 
                                    <tr key={detail.productCode}>
                                        <td>{detail.product.productName}</td>
                                        <td className="text-center">{detail.quantityOrdered}</td>
                                        <td className="text-center">{detail.priceEach}</td>
                                        <td className="text-right">{(detail.priceEach * detail.quantityOrdered).toFixed(2)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    }
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

export default OrderRow;