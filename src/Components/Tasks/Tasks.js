import { useEffect, useState } from "react"
import { fetchAllTasks, deleteTask } from "../../api/Endpoints"
import SimpleDateTime from 'react-simple-timestamp-to-date';
import { ButtonGroup, Checkbox, CircularProgress, IconButton, List, ListItem } from "@mui/material";
import DeleteOutlineIconlete from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

import "../../styles.scss";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

const Tasks = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [checked, setChecked] = useState(false);

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const editTaskHandler = (task) => {
        console.log(task.uuid)
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div>
            {isLoading ? <CircularProgress /> : <List className="taskList">
                {tasks.map(task => {
                    return (
                        <ListItem sx={{ justifyContent: 'space-between' }} className="task" key={task.uuid}>
                            <Checkbox
                                {...label} checked={task.isCompleted} onChange={handleChange}  style={{ color: "white" }} />
                            <div>
                                <h3> {task.description} </h3>
                                <span>
                                    <SimpleDateTime dateFormat="YMD" dateSeparator="-" timeSeparator=":">{task.createdAt}</SimpleDateTime>
                                </span>
                            </div>
                            <ButtonGroup>
                                <IconButton onClick={() => { editTaskHandler(task) }}>
                                    <EditIcon style={{ color: "white" }} />
                                </IconButton>
                                <IconButton onClick={() => { deleteTaskHandler(task.uuid) }}>
                                    <DeleteOutlineIconlete style={{ color: "white" }} />
                                </IconButton>
                            </ButtonGroup>
                        </ListItem>
                    )
                })}
            </List>}
        </div>
    );
};



export default Tasks