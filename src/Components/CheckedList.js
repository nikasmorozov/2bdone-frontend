import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { deleteTask, fetchAllTasks, putToggleIsCompleted } from '../api/Endpoints';
import SimpleDateTime from 'react-simple-timestamp-to-date';
import { Box } from '@mui/system';
import { ButtonGroup, IconButton } from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import "../styles.scss";
import CreateTaskForm from './Tasks/CreateTaskForm';

export default function CheckboxList() {
  const [tasks, setTasks] = useState([]);
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

  const handleToggleComplete = (uuid) => {
    putToggleIsCompleted(uuid);

    const tempTask = tasks.find(task => task.uuid == uuid);
    tempTask.isCompleted = !tempTask.isCompleted;
    setTasks(tasks);
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
                <ListItemText id={labelId} primary={`${task.description}`} />
                <span>
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
    </div>
  );
}
