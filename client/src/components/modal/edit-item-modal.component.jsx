import React, { useState, Fragment } from 'react';
import ItemForm from '../item/item-form.component';
import Modal from './modal.component';

const EditItem = ({ modalTitle, id }) => {
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);

    return(
        <Fragment>
        <button style={{ outline: 'none' }} className="btn-edit task-btn" onClick={() => setModalShow(true)}>
            <i className='fas fa-pen'></i>
        </button>             
        <Modal show={modalShow} size="lg" onHide={handleClose} title={modalTitle} arialabelledby="contained-modal-title-vcenter" component={<ItemForm id={id} onHide={handleClose}/>} />
        </Fragment>
    );
}
export default EditItem;