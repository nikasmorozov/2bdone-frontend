import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { deleteTask, fetchAllTasks, putToggleIsCompleted, deleteCompletedTasksFromServer } from '../api/Endpoints';
import SimpleDateTime from 'react-simple-timestamp-to-date';
import { Box } from '@mui/system';
import { Button, ButtonGroup, CircularProgress, IconButton, Typography } from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import CreateTaskForm from './CreateTaskForm';
import { withTranslation } from "react-i18next";
import "../styles.scss";

const TaskList = ({ t }) => {
  const [tasks, setTasks] = useState([]);
  // const [completedTasksUuids, setCompletedTasksUuids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [descriptionToEdit, setDescriptionToEdit] = useState('');

  useEffect(() => {
    fetchAllTasks()
      .then(({ data }) => {
        setTasks(data.tasks);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  const updateTasks = () => {
    fetchAllTasks()
      .then(({ data }) => {
        setTasks(data.tasks);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const deleteTaskHandler = (uuid) => {
    deleteTask(uuid);
    setTasks(tasks.filter(task => task.uuid !== uuid));
  };

  const handleToggleCompleteV2 = (uuid) => {
    putToggleIsCompleted(uuid);

    const newTasks = tasks.map((Task) => {
      if (Task.uuid === uuid) {
        const updatedTask = {
          ...Task,
          isCompleted: !Task.isCompleted,
        };

        return updatedTask;
      }

      return Task;
    });
    console.log(newTasks);

    setTasks(newTasks);
  }

  const deleteCompletedTasks = () => {
    deleteCompletedTasksFromServer(
      tasks.filter(task => task.isCompleted).map(task => task.uuid)
    );
    setTasks(tasks.filter(task => !task.isCompleted));
  }

  return (
    <div>
      {isLoading ? <CircularProgress /> : <List>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
        <h4>TODAY'S TASKS</h4>
        <Button onClick={() => { deleteCompletedTasks() }}
      style={{ backgroundColor: "#42a5f5", borderRadius: "10px" , lineHeight: "0px", marginTop: "20px"}}>
        <h4>{t("Delete completed tasks")}</h4>
      </Button>
          </Box>
        {tasks.map((task) => {
          const labelId = `checkbox-list-label-${task.description}`;

          return (
            <ListItem
              key={task.uuid}
              secondaryAction={
                <div></div>
              }
              disablePadding
              className="task"
            >
              <ListItemButton role={undefined} onClick={() => { handleToggleCompleteV2(task.uuid) }} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.isCompleted}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    style={{ color: ((!task.isCompleted) ? "#e040fb" : "white") }}
                  />
                </ListItemIcon>
                <Box>
                  <ListItemText id={labelId}
                    disableTypography
                    primary={<Typography type="body2"
                      style={{ fontSize: "20px", fontWeight: "400", textDecoration: ((task.isCompleted) ? "line-through" : "") }}>
                      {`${task.description}`}
                    </Typography>}
                  />
                  <span>
                    {t("Created ")}
                    <SimpleDateTime dateFormat="YMD" dateSeparator="-" timeSeparator=":">{task.createdAt}</SimpleDateTime>
                  </span>
                </Box>
              </ListItemButton>
              <ButtonGroup>
                <IconButton onClick={() => { setDescriptionToEdit(task.description) }}>
                  <EditIcon style={{ color: ((!task.isCompleted) ? "#e040fb" : "white") }} />
                </IconButton>
                <IconButton onClick={() => { deleteTaskHandler(task.uuid) }}>
                  <DeleteOutline style={{ color: ((!task.isCompleted) ? "#e040fb" : "white") }} />
                </IconButton>
              </ButtonGroup>
            </ListItem>
          );
        })}
      </List>}
      <CreateTaskForm updateTasks={updateTasks}></CreateTaskForm>
      
    </div>
  );
}

export default withTranslation()(TaskList);
