import React from 'react';
import { Col, Row, Card, Button, InputGroup, FormControl, Image } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export const MyClientCard = ({ client, program,
    startNotificationHandler,
    notifications, newNotificationText, addNotification, doAddNotification,
    changeNewNotificationTextHandler, endNotificationHandler, lastVisit,
    sendVisitNotification, registerVisitHandler, trainer, data }) => {

    const NotificationsList = () => {
        return (
            notifications.map((notification, index) => {
                return (
                    <div key={notification._id}>
                        <p><strong>{notification.comment}</strong></p>
                        <p className="ml-3">{new Date(notification.date).toLocaleString()} - {notification.eventType === 3 ? (notification.trainer.fullname) : (notification.client.fullname)}</p>
                    </div>
                )
            })
        )
    }

console.log(data);
    return (
        <>
        
            <Row className="mt-3">
                <Col xs={2} md={{ span: 4 }}>
                    <Image src="https://strikerealty.com/wp-content/uploads/2019/06/profile-placeholder.png" fluid />
                </Col>
                <Col xs={10} md={{ span: 4, offset: 4 }}>
                    <h1>{client.fullname}</h1>
                </Col>
            </Row>

            <Row className="mt-3 justify-content-md-center" className="justify-content-md-center">
                <Col xs={{span: 6, offset: 0}}>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#8884d8" />
                    </BarChart>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h2>Останній візит</h2>
                </Col>
                <Col>
                    {!lastVisit && (
                        <h2>Немає даних</h2>
                    )}
                    {(lastVisit) && (Math.round(Math.abs((new Date(lastVisit) - Date.now()) / (24 * 60 * 60 * 1000))) === 0) && (
                        <h2> - сьогодні</h2>
                    )}
                    {(lastVisit) && (Math.round(Math.abs((new Date(lastVisit) - Date.now()) / (24 * 60 * 60 * 1000))) !== 0) && (
                        <h2> - {Math.round(Math.abs((new Date(lastVisit) - Date.now()) / (24 * 60 * 60 * 1000)))} днів тому</h2>
                    )}
                </Col>
                <Col>
                    <Button block={true} onClick={registerVisitHandler} variant="primary">Відмітитися</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {trainer && (
                        <h2>Мій тренер - {trainer.fullname}</h2>
                    )}
                    {!trainer && (
                        <h2>У мене поки немає тренера</h2>
                    )}
                </Col>
            </Row>
            <Row>
                <Col xs={8} md={10}>
                    <h2>Програма занять</h2>
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
                                <p className="text-center">Програми занять не знайдено</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={8} md={10}>
                    <h2>Повідомлення</h2>
                </Col>
                <Col>
                    <Button block={true} onClick={startNotificationHandler} variant="warning">Надіслати</Button>
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
                                    <Button className="mt-3 mr-3" onClick={addNotification} variant="success">Надіслати</Button>
                                    <Button className="mt-3" onClick={endNotificationHandler} variant="secondary">Відмінити</Button>
                                </>
                            )

                            }
                            {!notifications.length && (
                                <h3 className="text-center">Немає повідомлень</h3>
                            )}

                            {(notifications.length > 0) && (
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