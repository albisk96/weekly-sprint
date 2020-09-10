import React, { useContext } from 'react';
import { TaskContext } from "../../contexts/TaskContext";
import { DropdownButton } from 'react-bootstrap'
import ArchiveList from './archive-list.component';

const Archive = () => {
    const { archive } = useContext(TaskContext);
    
    return(
        <DropdownButton id='dropdown-button' drop='down' title="Archive">
            <ArchiveList archive={archive} />
        </DropdownButton>
    )
}

export default Archive;