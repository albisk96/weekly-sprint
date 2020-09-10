import React, {useContext, useState} from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { TaskContext } from "../../contexts/TaskContext";

const SprintItems = ({ sprint }) => {
    const { returnItem, disable } = useContext(TaskContext);
    //const [ disable, setDisable ] = useState({});

    // const handleEvent = (id) => {
    //     returnItem(id)
        // setDisable(...disable, id)
        // setDisable(prevItem => ({
        //     ...prevItem,
        //     [id]: !prevItem[id]
        //   }));
    //}
    console.log(disable)

    return(
        <Container style={{ color: 'white'}}>
        <Table responsive striped bordered hover variant="dark">
        <thead>
            <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {sprint.items.map((item, index) => (
            <tr>
            <td>{index + 1}</td>
            <td>{item.title}</td>
            <td>{item.status}</td>
            <td>{item.priority}</td>
            <td>
            {item.returned || disable[item._id] ? '' :
                <Button
                    variant="outline-primary" 
                    onClick={() => returnItem(item._id)}
                >
                Continue
                </Button>
            }
            </td>
            </tr>
        ))}
        </tbody>
        </Table>
        </Container>
    )
}

export default SprintItems;