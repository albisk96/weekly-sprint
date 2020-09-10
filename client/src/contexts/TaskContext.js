import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const TaskContext = createContext()

const TaskContextProvider = props => {

    const [start, setStart] = useState([]);
    const [progress, setProgress] = useState([]);
    const [done, setDone] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [archive, setArchive] = useState([]);
    const [disable, setDisable] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      const fetchData = async() => {
          setIsLoading(true);
          try {
              const result = await axios.get('/api/sprint')
              setTasks(result.data)
              filterItems(result.data)
          } catch (error){
              setIsError(true);
          }
          setIsLoading(false);
      } 
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async() => {
          setIsLoading(true);
          try {
              const result = await axios.get('/api/sprint/archive')
              setArchive(result.data);
          } catch (error){
              setIsError(true);
          }
          setIsLoading(false);
      } 
      fetchData();
    }, []);

    const filterItems = items => {
      setStart(items.filter(x => x.status === 'start'))
      setProgress(items.filter(x => x.status === 'progress'))
      setDone(items.filter(x => x.status === 'done'))
    }

    const addItem = (values) => {
      axios.post('/api/item', values)
          .then(res => {
            let newItemsArr = [res.data, ...tasks]
            setTasks(newItemsArr)
            filterItems(newItemsArr);
          })
    };

    const deleteItem = id => {
      axios.delete(`/api/item/${id}`)
      .then(() => {
        let newItemsArr = tasks;
        const index = newItemsArr.findIndex(x => x._id === id);
        newItemsArr.splice(index, 1);
        //remove 1 element from index: index
        filterItems(newItemsArr)
        setTasks(newItemsArr)
        // update items
      })
    }

    const editItem = (id, values) => {
      axios.put(`/api/item/${id}`, values)
        .then(res => {
          // delete old post
          let newItemsArr = tasks;
          const index = newItemsArr.findIndex(x => x._id === id);
          newItemsArr.splice(index, 1);
          // update a new post
          let newArr = [res.data, ...newItemsArr]
          setTasks(newArr)
          filterItems(newArr);
        })
      }

    const returnItem = id => {
      disableButtons(id);
      axios.post(`/api/sprint/${id}`, id)
        .then(res => {
          let newItemsArr = [res.data, ...tasks]
          setTasks(newItemsArr)
          filterItems(newItemsArr);
      })
    }

    const disableButtons = id => {
      setDisable(prevItem => ({
        ...prevItem,
        [id]: !prevItem[id]
      }));
    }

  return (
    <TaskContext.Provider
      value={{
        start,
        progress,
        done,
        deleteItem,
        addItem,
        editItem,
        returnItem,
        archive,
        disable
      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskContextProvider