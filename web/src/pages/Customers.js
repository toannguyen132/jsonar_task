import React, { useState, useEffect } from 'react'
import {fetchCustomers, fetchOrders, removeToken} from '../utils/service';
import {Container, Row, Col, Form, ListGroup, Accordion, Button} from 'react-bootstrap';
import CustomerItem from '../components/CustomerItem'
import OrderRow from '../components/OrderRow'
import { useHistory } from 'react-router-dom';
import CustomerInfo from '../components/CustomerInfo';

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [allCustomers, setAllCustomers] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [orders, setOrders] = useState([]);

    // assigning after fetching customers
    const assignAllCustomers = (list) => {
        // setCustomers(list);
        setAllCustomers(list);
    }

    // Fetch for the first time
    useEffect(() => {
        // get customers
        fetchCustomers()
            .then(list => {
                console.log('test');
                assignAllCustomers(list)
            })
    }, []);

    /**
     * Filter the customers
     */
    useEffect(() => {
        const filteredCustomers = allCustomers.filter(customer => {
            return customer.customerName.toLowerCase().indexOf(searchName.toLowerCase()) >= 0
        })
        setCustomers(filteredCustomers);
    }, [searchName, allCustomers])
    // ------------------------------------------------------------

    const selectCustomer = (customerId) => {
        setSelectedCustomer(allCustomers.find(cus => cus.customerNumber === customerId));
    }

    /**
     * trigger when select customer
     */
    useEffect(() => {
        if (selectedCustomer) {
            // get customers
            fetchOrders(selectedCustomer.customerNumber)
                .then(list => {
                    const orderedList = list.sort((a, b) => {
                        if (a.orderDate > b.orderDate) return 1;
                        else if (a.orderDate === b.orderDate) return 0;
                        else return -1;
                    })
                    setOrders(orderedList);
                })
        }
    }, [selectedCustomer]);

    /**
     * logout
     */
    const history = useHistory();
    const logout = () => {
        removeToken();
        history.push('/');
    }

    return (
        <div>
            <Container className="page-container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Customers</h1>
                    <Button onClick={logout}>Log Out</Button>
                </div>

                <Row className="page-row">
                    <Col lg={4} className="overflowed-container">
                        <Form.Group>
                            <Form.Control 
                                type="text" 
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                placeholder="Search Customer name" />
                        </Form.Group>
                        <ListGroup className="overflowed-list">
                            {customers.map(customer => 
                                <CustomerItem 
                                    onSelect={selectCustomer} 
                                    key={customer.customerNumber} 
                                    active={selectedCustomer && selectedCustomer.customerNumber === customer.customerNumber} 
                                    {...customer} />
                            )}
                        </ListGroup>
                    </Col>
                    <Col lg={8}>
                        <Accordion>
                            {
                                !selectedCustomer ? 
                                    <div className="text-center">Please select one customer to view order</div> 
                                    :
                                    <React.Fragment>
                                        <CustomerInfo customer={selectedCustomer} />
                                        {orders.map(order => 
                                            <OrderRow key={order.orderNumber} customerId={selectedCustomer.customerNumber} order={order} />
                                        )}
                                    </React.Fragment>
                            }
                        </Accordion>
                    </Col>
                </Row>
                
            </Container>
        </div>
    );
}

export default Customers;