import React from 'react';

import { Card, Row , Col} from 'react-bootstrap';

export const UserCard = ({ user }) => {
    return (
        <Row className="mt-3">
            <Col xs={{ span: 6, offset: 3 }} >
            <Card className="text-center">
                <Card.Header>Мій профіль</Card.Header>
                <Card.Img variant="top" width="300" src="https://i.stack.imgur.com/l60Hf.png" />
                <Card.Body>
                    <Card.Title>{user.fullname}</Card.Title>
                    <Card.Text>
                        <p>Електронна адреса: {user.email}</p>
    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted"><p><strong>Тренер</strong></p></Card.Footer>
            </Card>
            </Col>
        </Row>
    )
}


//             <h2>Profile</h2>
//             <p>Email: {user.email}</p>
//             <p>Fullname: {user.fullname}</p>
//             <p>Role: <strong>{user.role}</strong></p>
//             <p>Registered: <strong>{new Date(user.registered).toLocaleDateString()}</strong></p>