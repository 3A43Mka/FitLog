import { React, useContext } from 'react';
import {InputGroup, FormControl, Col, Row, Button} from 'react-bootstrap';

export const SearchField = ({changeHandler, search, searchHandler, enterHandler}) => {
    return (
        <Row>
            <Col className="mt-3" md={{span: 10}}>
        <InputGroup>
        <FormControl
            placeholder="Search users..."
            id="search"
            name="search"
            type="text"
            value={search}
            onChange={changeHandler}
            onKeyPress={enterHandler}
        />
    </InputGroup> 
    </Col>
    <Col className="mt-3" md={{span: 2}}>
    <Button variant="primary" block={true} onClick={searchHandler}>Search</Button>

    </Col>
    </Row>
    )
}