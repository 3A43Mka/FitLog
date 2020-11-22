import React from 'react';
import { Col, Row, Card, Button, InputGroup, FormControl, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ClientCard = ({ client, program, doEditProgram,
    addProgram, changeNewProgramTextHandler, newProgramText,
    startEditHandler, endEditHandler, startNotificationHandler,
    notifications, newNotificationText, addNotification, doAddNotification,
    changeNewNotificationTextHandler, endNotificationHandler, lastVisit,
    sendVisitNotification, trainer, addTrainer, isMyClient, templates, selectTemplateHandler,
insertTemplate }) => {

    const NotificationsList = () => {
        console.log(notifications);
        return (
            notifications.map((notification, index) => {
                return (
                    <div key={notification._id}>
                        <p><strong>{notification.comment}</strong></p>
                <p className="ml-3">{new Date(notification.date).toLocaleString()} - {notification.eventType === 3? (notification.trainer.fullname): (notification.client.fullname)}</p>
                    </div>
                )
            })
        )
    }


    return (
        <>
            <Row className="mt-3">
                <Col xs={2} md={{ span: 4 }}>
                    <h1><Link to={`/users/`} >&lt;</Link></h1>
                    <Image src="https://strikerealty.com/wp-content/uploads/2019/06/profile-placeholder.png" fluid />

                </Col>
                <Col xs={10} md={{ span: 4, offset: 4 }}>
                    <h1>{client.fullname}</h1>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h2 className="text-center">Якісь графіки тут...</h2>
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
                    {(lastVisit) && (Math.round(Math.abs((new Date(lastVisit) - Date.now()) / (24 * 60 * 60 * 1000))) === 0) &&(
                        // <h2> - {new Date(lastVisit).toLocaleDateString()}</h2>
                    <h2> - сьогодні</h2>
                    )}
                    {(lastVisit) && (Math.round(Math.abs((new Date(lastVisit) - Date.now()) / (24 * 60 * 60 * 1000))) !== 0) &&(
                        // <h2> - {new Date(lastVisit).toLocaleDateString()}</h2>
                    <h2> - {Math.round(Math.abs((new Date(lastVisit) - Date.now()) / (24 * 60 * 60 * 1000)))} днів тому</h2>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    {((trainer) && (isMyClient)) && (
                        <h2>Тренер - {trainer.fullname}</h2>
                    )}
                    {((trainer) && (!isMyClient)) && (
                        <>
                            <h2>Тренер - {trainer.fullname}</h2>
                            <Button block={true} onClick={addTrainer} variant="success">Стати тренером</Button>
                        </>
                    )}
                    {!trainer && (
                        <>
                            <h2>Немає тренера</h2>
                            <Button block={true} onClick={addTrainer} variant="success">Стати тренером</Button>
                        </>
                    )}
                </Col>
            </Row>
            <Row>
                <Col xs={8} md={10}>
                    <h2>Програма занять</h2>
                </Col>
                <Col>
                    {
                        ((!doEditProgram) && (isMyClient)) && (
                            <Button block={true} onClick={startEditHandler} variant="success">Редагувати</Button>
                        )
                    }
                    {doEditProgram && (
                        <>
                            <Form.Control as="select" onChange={selectTemplateHandler}>
                                
                                {
                                    templates.map((template, index) => {
                                        return (
                                        <option value={index} key={template._id}>{template.title}</option>
                                        )
                                    })
                                }
                                
                            </Form.Control>
                            <Button className="mt-2 mb-2" onClick={insertTemplate} variant="success">Вставити шаблон</Button>

                        </>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card bg="light" >
                        <Card.Body>
                            {(program && !doEditProgram) && (
                                <p style={{ whiteSpace: "pre-line" }}>{program}</p>
                            )}
                            {(!program && !doEditProgram) && (
                                <p className="text-center">Програми не знайдено</p>
                            )}
                            {doEditProgram && (
                                <>
                                    <InputGroup>
                                        <FormControl rows="10" value={newProgramText} onChange={changeNewProgramTextHandler} as="textarea" aria-label="With textarea" />
                                    </InputGroup>
                                    <Button className="mt-3 mr-3" onClick={addProgram} variant="success">Зберегти</Button>
                                    <Button className="mt-3" onClick={endEditHandler} variant="secondary">Відмінити</Button>
                                </>
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