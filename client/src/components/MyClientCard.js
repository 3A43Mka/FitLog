import React from 'react';
import { Col, Row, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

export const MyClientCard = ({ client, program,
    startNotificationHandler,
    notifications, newNotificationText, addNotification, doAddNotification,
    changeNewNotificationTextHandler, endNotificationHandler, lastVisit, 
    sendVisitNotification, registerVisitHandler, trainer }) => {

    const NotificationsList = () => {
        return (
            notifications.map((notification, index) => {
                return (
                    <div key={notification._id}>
                        <p><strong>{notification.comment}</strong></p>
                <p className="ml-3">{notification.trainer.fullname} - {new Date(notification.date).toLocaleString()}</p>
                    </div>
                )
            })
        )
    }


    return (
        <>
            <Row className="mt-3">
                <Col xs={2} md={{ span: 4 }}>
                </Col>
                <Col xs={10} md={{ span: 4, offset: 4 }}>
                    <h1>{client.fullname}</h1>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h2 className="text-center">Some graphs here...</h2>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                <h2>Last visit</h2>
                </Col>
                <Col>
                    {!lastVisit && (
                        <h2>No visits</h2>
                    )}
                    {(lastVisit) && (Math.round(Math.abs((new Date(lastVisit) - Date.now()) / (24 * 60 * 60 * 1000))) === 0) &&(
                        // <h2> - {new Date(lastVisit).toLocaleDateString()}</h2>
                    <h2> - today</h2>
                    )}
                    {(lastVisit) && (Math.round(Math.abs((new Date(lastVisit) - Date.now()) / (24 * 60 * 60 * 1000))) !== 0) &&(
                        // <h2> - {new Date(lastVisit).toLocaleDateString()}</h2>
                    <h2> - {Math.round(Math.abs((new Date(lastVisit) - Date.now()) / (24 * 60 * 60 * 1000)))} days ago</h2>
                    )}
                </Col>
                <Col>
                <Button block={true} onClick={registerVisitHandler} variant="primary">I was today!</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                {trainer && (
                    <h2>My trainer - {trainer.fullname}</h2>
                )}
                {!trainer && (
                    <h2>I have no trainer!</h2>
                )}
                </Col>
            </Row>
            <Row>
                <Col xs={8} md={10}>
                    <h2>Exercise Program</h2>
                </Col>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>
                    <Card bg="light" >
                        <Card.Body>
                            {(program) && (
                                <p style={{ whiteSpace: "pre-line" }}>{program}</p>
                            )}
                            {(!program) && (
                                <p className="text-center">no program found</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={8} md={10}>
                    <h2>Notifications</h2>
                </Col>
                <Col>
                    <Button block={true} onClick={startNotificationHandler} variant="warning">Add</Button>
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col>
                    <Card bg="light" >
                        <Card.Body>
                            {doAddNotification && (
                                <>
                                    <InputGroup>

                                        <FormControl rows="3" value={newNotificationText} onChange={changeNewNotificationTextHandler} as="textarea" aria-label="With textarea" />
                                    </InputGroup>
                                    <Button className="mt-3 mr-3" onClick={addNotification} variant="success">Save</Button>
                                    <Button className="mt-3" onClick={endNotificationHandler} variant="secondary">Cancel</Button>
                                </>
                            )

                            }
                            {!notifications.length && (
                                <h3 className="text-center">No notifications yet...</h3>
                            )}

                            {(notifications.length>0) && (
                                <NotificationsList />
                            )}

                        </Card.Body>
                    </Card>
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