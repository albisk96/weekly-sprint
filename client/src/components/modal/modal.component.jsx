import React from 'react';
import { Modal } from 'react-bootstrap'
import { ModalContent, ModalHeader, ModalBody} from './modal.styles'

const showModal = ({ show, onHide, component, size, arialabelledby, ...props }) => (
    <Modal dialogClassName={size} show={show} onHide={onHide} size={size} aria-labelledby={arialabelledby}>
      <ModalContent>
        <ModalHeader closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </ModalHeader>
        <ModalBody style={props.bodyStyle}>
            {component}
        </ModalBody>
      </ModalContent>
    </Modal>
);
  
export default showModal;