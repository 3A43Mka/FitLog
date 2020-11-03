import React from 'react';
import { Row, Spinner, Col } from 'react-bootstrap';

export const Loader = () => (
    <Row className="mt-3">
        <Col align='center'>
            <Spinner animation="grow" variant="success" />
        </Col>
    </Row>
);