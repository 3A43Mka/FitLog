import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Row, Col, InputGroup, FormControl, Card, Button } from 'react-bootstrap';
export const ExercisesList = ({ exercises
}) => {

  return (
    exercises.map((exercise, index) => {
      return (
        <Row className="mt-3">
          <Col>
            <Card >
              <Card.Body>
                <Card.Title>{exercise.title}</Card.Title>
                <Card.Text>
                  <p><strong>Quantity - </strong> {exercise.quantity}</p>
                  {(exercise.weights) && (
                    <p><strong>Weights - </strong> {exercise.weights}</p>
                  )}
                  <p><strong>Date - </strong>{new Date(exercise.date).toLocaleString()}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )
    })
  )
}



