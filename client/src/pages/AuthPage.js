import {React, useContext, useEffect, useState} from 'react';
import { Row, Col, Card, Button, InputGroup, FormControl} from 'react-bootstrap';
import {useHttp} from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import {AuthContext} from '../context/AuthContext';
export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', fullname: '', password: ''
    });
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (err) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            message(data.message);
            auth.login(data.token, data.userId, data.userRole);
            console.log(data.userRole);
        } catch (err) { console.log(err)}
    }

    return (
        <Row className="justify-content-md-center">
            <Col lg={6} offset-lg={3}>
                <h1>FitLog</h1>
                <Card bg="light" >
                    <Card.Body>
                        <Card.Title>Авторизація</Card.Title>
                        <div>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Електронна адреса"
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={changeHandler}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Повне Ім'я"
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    onChange={changeHandler}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Пароль"
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={changeHandler}
                                />
                            </InputGroup>
                        </div>
                        <Button variant="primary" disabled={loading} onClick={loginHandler} style={{ marginRight: 10 }}>Увійти</Button>
                        <Button variant="success" disabled={loading} onClick={registerHandler}>Реєстрація</Button>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}