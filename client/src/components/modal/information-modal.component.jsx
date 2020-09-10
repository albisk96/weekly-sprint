import React, { useState } from 'react';
import Information from '../item/item-info.component';
import Modal from './modal.component';

const ItemInformation = ({ item }) => {
    const [modalShow, setModalShow] = useState(false);
    const priorityColor = item.priority === 1 ? '#c90303' : item.priority === 2 ? '#b7b700' : 'white'

    return(
        <div>
            <span onClick={() => setModalShow(true)} style={{cursor: 'pointer', color: `${priorityColor}`}}>
                {item.title}
            </span>                
            <Modal show={modalShow} size="lg" onHide={() => setModalShow(false)} arialabelledby="contained-modal-title-vcenter" component={<Information item={item} />} />
        </div>
    );
}
export default ItemInformation;