import { useFormik } from 'formik';
import { Button, TextField } from "@mui/material";
import { postNewTask } from '../../api/Endpoints';
import BasicModal from '../BasicModal';

const CreateTaskForm = (props) => {
  const formik = useFormik({
    initialValues: {
      description: 'Create a React Project'
    },
    onSubmit: (values) => {
      postNewTask(values)
      .finally(() => {
        console.log(JSON.stringify(values, null, 2));
      })
    },
  }
  );

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Add a new task"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}


export default CreateTaskForm