import HTTP from ".";

const fetchAllTasks = () => HTTP.get("/tasks/")
    .finally(response =>
        new Promise((resolve, reject) => {
            setTimeout(() => resolve(response), 100)
            console.log("Tasks fetched succesfully")
        }));

const postNewTask = (task) =>
    HTTP.post("/tasks/", task)
    .then(response => {
        if (response.data != null) {
            console.log("Task added succesfully")
        }
    });

const putToggleIsCompleted = (uuid) => 
    HTTP.put(("/tasks/") + uuid)
    .then(response => {
        if (response.data != null) {
            console.log("Task isCompleted toggled")
        }
    });

const deleteTask = (uuid) => {
    HTTP.delete(("/tasks/") + uuid)
        .then(response => {
            if (response.data != null) {
                console.log("Task deleted succesfully")
            }
        });
};



export {
    fetchAllTasks,
    postNewTask,
    deleteTask,
    putToggleIsCompleted
}