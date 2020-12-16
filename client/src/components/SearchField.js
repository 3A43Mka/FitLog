import { React } from 'react';
import {InputGroup, FormControl, Col, Row, Button} from 'react-bootstrap';

export const SearchField = ({changeHandler, search, searchHandler, enterHandler}) => {
    return (
        <Row>
            <Col className="mt-3" md={{span: 10}}>
        <InputGroup>
        <FormControl
            placeholder="Шукати користувачів ..."
            id="search"
            name="search"
            type="text"
            autoComplete="off"
            value={search}
            onChange={changeHandler}
            onKeyPress={enterHandler}
        />
    </InputGroup> 
    </Col>
    <Col className="mt-3" md={{span: 2}}>
    <Button variant="primary" block={true} onClick={searchHandler}>Пошук</Button>

    </Col>
    </Row>
    )
}