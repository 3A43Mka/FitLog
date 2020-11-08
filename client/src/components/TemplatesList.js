import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Row, Col, InputGroup, FormControl, Card, Button } from 'react-bootstrap';
export const TemplatesList = ({ templates
}) => {

  return (
    templates.map((template, index) => {
      return (
        <Row className="mt-3">
          <Col>
            <Card >
              <Card.Body>
      <Card.Title>{template.title}</Card.Title>
                <Card.Text>
                  <p style={{ whiteSpace: "pre-line" }}>{template.text}</p>
    </Card.Text>
                {/* <Card.Link href="#">Card Link</Card.Link> */}
                {/* <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )
    })
  )
}



