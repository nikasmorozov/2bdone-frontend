import React from 'react';
import './App.css';
import BasicModal from './Components/BasicModal';
import CreateTaskForm from './Components/Tasks/CreateTaskForm';
import Tasks from './Components/Tasks/Tasks';
import "./styles.scss"




function App() {
  return (
    <div className="App">
      <div className="main-window">
        <h1>Hello, User</h1>
        <Tasks />
        <BasicModal></BasicModal>
      </div>
    </div>
  );
};

export default App;