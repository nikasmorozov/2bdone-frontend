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
import { Button, ButtonGroup, IconButton, Typography } from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import CreateTaskForm from './Tasks/CreateTaskForm';
import { withTranslation } from "react-i18next";
import "../styles.scss";

const TaskList = ({ t }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasksUuids, setCompletedTasksUuids] = useState([]);
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
    )
  }

  return (
    <div>
      {isLoading ? <Box /> : <List sx={{ width: '100%' }}>
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
                    style={{ color: "white" }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId}
                  disableTypography
                  primary={<Typography type="body2"
                    style={{ fontSize: "25px", fontWeight: "800" }}>
                    {`${task.description}`}
                  </Typography>}
                />
                <span>
                  {t("Created at")} <br />
                  <SimpleDateTime dateFormat="YMD" dateSeparator="-" timeSeparator=":">{task.createdAt}</SimpleDateTime>
                </span>
              </ListItemButton>
              <ButtonGroup>
                <IconButton onClick={() => { setDescriptionToEdit(task.description) }}>
                  <EditIcon style={{ color: "white" }} />
                </IconButton>
                <IconButton onClick={() => { deleteTaskHandler(task.uuid) }}>
                  <DeleteOutline style={{ color: "white" }} />
                </IconButton>
              </ButtonGroup>
            </ListItem>
          );
        })}
      </List>}
      <CreateTaskForm initialValue={descriptionToEdit}></CreateTaskForm>
      <Button onClick={() => { deleteCompletedTasks() }}>
        <h4>{t("Delete completed tasks")}</h4>
      </Button>
    </div>
  );
}

export default withTranslation()(TaskList);
