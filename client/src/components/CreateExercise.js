import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Row, Col, InputGroup, FormControl, Card, Button } from 'react-bootstrap';
export const CreateExercise = ({ addExercise, newTitle, changeNewQuantityHandler,changeNewWeightsHandler, changeNewTitleHandler, newQuantity, newWeights
}) => {

  return (

    <Row className="mt-3">
      <Col>
        <Card bg="light" >
          <Card.Body>
            <div>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Exercise title"
                  id="title"
                  name="title"
                  type="text"
                  value={newTitle}
                  onChange={changeNewTitleHandler}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Quantity"
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={newQuantity}
                  onChange={changeNewQuantityHandler}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Weights (in kg)"
                  id="weights"
                  name="weights"
                  type="number"
                  value={newWeights}
                  onChange={changeNewWeightsHandler}
                />
              </InputGroup>
            </div>
            <Button className="mr-3" onClick={addExercise} variant="success">Add</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}