import React, { useState } from 'react'
import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';
import service, { setToken } from '../utils/service';
import { useHistory } from 'react-router-dom';
import {Formik} from 'formik';
import * as Yup from 'yup';


function Home() {
    const [message, setMessage] = useState('');
    const history = useHistory();

    const schema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required()
    });

    const submit = (data) => {
        const {username, password} = data;

        // 
        service.post('/login', {
            username,
            password
        }).then((resp) => {
            return resp.data
        }).then(data => {
            if (data.token){
                setToken(data.token)
                history.push('/customers');
            }
        }).catch(e => {
            setMessage(e.response.data.message);
        }).catch(e => {
            setMessage('There is error, please try again!')
        })
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg="6">
                    <h1>Login:</h1>
                    {  
                        message ? 
                            <Alert variant="danger">{message}</Alert> : null
                    }
                    <Formik 
                        onSubmit={submit}
                        validationSchema={schema}
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                    >
                        {({
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Control type="text" 
                                        value={values.username} 
                                        name="username"
                                        onChange={handleChange} 
                                        isInvalid={touched.username && !!errors.username}
                                        placeholder="Enter your username" />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control 
                                        type="password" 
                                        name="password"
                                        value={values.password} 
                                        onChange={handleChange} 
                                        isInvalid={touched.username && !!errors.password}
                                        placeholder="Enter your password" />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Button type="submit">Log In</Button>
                                </Form.Group>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;