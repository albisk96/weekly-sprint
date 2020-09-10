import React, { Fragment, useState } from 'react';
import { Dropdown, ProgressBar } from 'react-bootstrap'
import Modal from './modal.component';
import ArchivedSprintItems from '../archive/archive-sprint-items.component';
import { Row, Col } from 'react-bootstrap'

const ArchiveSprint = ({ item }) => {
    const [modalShow, setModalShow] = useState(false);
    const howManyCompleted = Math.round(item.completed * 100 / (item.completed + item.failed));

    return(
    <Fragment>
        <Row className='sprint-item' onClick={() => setModalShow(true)} style={{ width: '30vw' }}>
            <Col xs={12} md={12} lg={6}><Dropdown.Item>{`Sprint ${item.week}`}</Dropdown.Item></Col>
            <Col xs={12} md={12} lg={6}><ProgressBar className='progress-bar' striped variant="info" now={howManyCompleted} label={`${howManyCompleted}%`} /></Col>
        </Row>
        <Modal show={modalShow} size="lg" onHide={() => setModalShow(false)} title='Items' arialabelledby="contained-modal-title-vcenter" component={<ArchivedSprintItems sprint={item} />} />
    </Fragment>
    )
}

export default ArchiveSprint;