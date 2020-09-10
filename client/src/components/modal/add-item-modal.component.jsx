import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import ItemForm from '../item/item-form.component';
import Modal from './modal.component';

const AddItem = ({ modalTitle, id }) => {
    const [modalShow, setModalShow] = useState(false);

    return(
        <div>   
            <Button onClick={() => setModalShow(true)} variant="secondary" style={{ color: '#fff', backgroundColor: '#f44336', border: 0 }}>Add Item</Button>    
            <Modal show={modalShow} size="lg" onHide={() => setModalShow(false)} title={modalTitle} arialabelledby="contained-modal-title-vcenter" component={<ItemForm id={id} onHide={() => setModalShow(false)} />} />
        </div>
    );
}
export default AddItem;