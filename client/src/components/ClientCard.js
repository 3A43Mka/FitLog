import React from 'react';
import { Col, Row, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const ClientCard = ({ client, program, doEditProgram, addProgram, changeNewProgramTextHandler, newProgramText, startEditHandler }) => {
    return (
        <>
            <Row className="mt-3">
            <Col style={{border: "1px solid black"}} xs={2} md={{span: 4}}>
                    <h1><Link to={`/users/`} >&lt;</Link></h1>
                </Col> 
                <Col style={{border: "1px solid black"}} xs={10} md={{span: 4, offset: 4}}>
                    <h1>{client.fullname}</h1>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                <h2 className="text-center">Some graphs here...</h2>
                </Col>
            </Row>
            <Row>
                <Col xs={8} md={10}>
                <h2>Exercise Program</h2>
                </Col>
                <Col>
                <Button block={true} onClick={startEditHandler} variant="success">Edit</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                <Card bg="light" >
                    <Card.Body>
                        { (program && !doEditProgram) && (
                            <p style={{whiteSpace: "pre-line"}}>{program}</p>
                        )}
                        {(!program && !doEditProgram) && (
                            <p>no program found</p>
                        )}
                        {doEditProgram && (
                            <>
                            <InputGroup>
                            
                            <FormControl value={newProgramText} onChange={changeNewProgramTextHandler} as="textarea" aria-label="With textarea" />
                          </InputGroup>
                          <Button block={true} onClick={addProgram} variant="success">Save</Button>
                          </>
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