import React from 'react';
import ItemList from '../item/item-list.component'
import '../../App.css';
import { Container, Row, Col } from 'react-bootstrap';

const Card = ({ title, items }) => (
  <Container className="app-wrapper">
    <Row className="header">
      <Col sm={12} md={12} lg={12}>
        <h1>{title}</h1>
      </Col>
      <Col className="main">
       <ItemList items={items} />
      </Col>
    </Row>
  </Container>
)

export default Card;