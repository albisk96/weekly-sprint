import React, { useContext } from 'react';
import Card from './card.component';
import { TaskContext } from "../../contexts/TaskContext";
import { Col, Row, Container } from 'react-bootstrap'
import '../../App.css'

const Cards = () => {
    const { start,  progress, done } = useContext(TaskContext);

    return (
        <Container>
            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Col xs={12} md={12} lg={3}><Card title='Start' items={start} /></Col>
                <Col xs={12} md={12} lg={3}><Card title='In Progress' items={progress} /></Col>
                <Col xs={12} md={12} lg={3}><Card title='Done' items={done} /></Col>
            </Row>
        </Container>
    )
}

export default Cards