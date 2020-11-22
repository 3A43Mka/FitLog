import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Row, Col, InputGroup, FormControl, Card, Button } from 'react-bootstrap';
export const CreateTemplate = ({ addTemplate, newTemplateText, changeNewTeplateHandler, changeNewTitleHandler, newTemplateTitle
}) => {

  return (

    <Row className="mt-3">
      <Col>
        <Card bg="light" >
          <Card.Body>
            <div>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Назва шаблону"
                  id="title"
                  name="title"
                  type="text"
                  value={newTemplateTitle}
                  onChange={changeNewTitleHandler}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  as="textarea"
                  placeholder="Текст шаблону ..."
                  id="text"
                  name="text"
                  type="text"
                  rows="6"
                  value={newTemplateText}
                  onChange={changeNewTeplateHandler}
                />
              </InputGroup>
            </div>
            <Button className="mr-3" onClick={addTemplate} variant="success">Додати</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}