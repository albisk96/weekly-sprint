import React from 'react';
import Cards from './components/card/cards-list.component';
import TaskContextProvider from "./contexts/TaskContext";
import AddItem from './components/modal/add-item-modal.component';
import Archive from './components/archive/archive.component';
import { Row } from 'react-bootstrap';
import "./App.css";


const App = () => {
  return (
    <TaskContextProvider>
      <Row className="parent">
        <h1>Weekly Sprint</h1>
        <div>
          <AddItem modalTitle="Create Item" id='new' />
          <Archive />  
          </div>
        <Cards />
      </Row>
    </TaskContextProvider>
  );
};

export default App;
