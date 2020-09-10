import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Information = ({ item }) => {
    return(
        <Container style={{ color: 'white'}}>
            <Row>
                <h1>Information</h1>
            </Row>
            <hr/>
            <Row>
                <Col>Title:</Col>
                <Col>{item.title}</Col>
            </Row>
            <Row>
                <Col>Status:</Col>
                <Col>{item.status}</Col>
            </Row>
            <Row>
                <Col>Priority:</Col>
                <Col>{item.priority}</Col>
            </Row>
            <Row>
                <Col>Description:</Col>
                <Col>{item.description}</Col>
            </Row>
        </Container>
    )
}

export default Information;