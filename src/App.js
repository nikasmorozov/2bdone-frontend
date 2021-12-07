import React from 'react';
import './App.css';
import BasicModal from './Components/BasicModal';
import CheckboxList from './Components/CheckedList';
import CreateTaskForm from './Components/Tasks/CreateTaskForm';
import "./styles.scss"




function App() {
  return (
    <div className="App">
      <div className="main-window">
        <h1>Hello, User</h1>
        <CheckboxList/>
        
      </div>
    </div>
  );
};

export default App;