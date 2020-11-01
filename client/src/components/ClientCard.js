import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const ClientCard = ({ client }) => {
    return (
        <>
            <Row>
            <Col style={{background: "grey"}} xs={2} md={{span: 4}}>
                    <h1><Link to={`/users/`} >&lt;</Link></h1>
                </Col>
                <Col style={{background: "grey"}} xs={10} md={{span: 4, offset: 4}}>
                    <h1>{client.fullname}</h1>
                </Col>
            </Row>
            {/* <h2>Profile</h2>
            <p>Email: {client.email}</p>
            <p>Fullname: {client.fullname}</p>
            <p>Role: <strong>{client.role}</strong></p>
            <p>Registered: <strong>{new Date(client.registered).toLocaleDateString()}</strong></p> */}
        </>
    )
}