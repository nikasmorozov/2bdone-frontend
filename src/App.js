import React from 'react';
import './App.css';
import "./styles.scss"
import i18n from "i18next";
import { withTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import TaskList from './Components/TaskList';

function App({ t }) {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <div className="App">
      <div className="main-window">
        <h1>2BDONE</h1>
        <h3>TASK MANAGER</h3>
        <TaskList />
        <footer>
          <Button style={{ fontSize: "20px", color: "white" }} onClick={() => changeLanguage('en')}>EN</Button>
          <Button style={{ fontSize: "20px", color: "white" }} onClick={() => changeLanguage('lt')}>LT</Button>
          <Button style={{ fontSize: "20px", color: "white" }} onClick={() => changeLanguage('ru')}>RU</Button>
        </footer>
      </div>
    </div>
  );
};

export default withTranslation()(App);