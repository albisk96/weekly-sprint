import React, { useContext } from 'react';
import ItemInformation from '../modal/information-modal.component';
import { TaskContext } from "../../contexts/TaskContext";
import EditItem from '../modal/edit-item-modal.component'

const Item = ({ item }) => {
  const { deleteItem } = useContext(TaskContext);

  return (
    <li className="list-item">
    <ItemInformation variant="outline-primary" modalTitle="Create Item" item={item}/>
      <div>
        <button
          style={{ outline: 'none' }}
          className="btn-delete task-btn"
          onClick={() => deleteItem(item._id)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>{' '}
        <EditItem id={item._id} modalTitle="Edit Item"/>
      </div>
    </li>
  )
}

export default Item