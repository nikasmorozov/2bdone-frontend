import { useFormik } from 'formik';
import { Button, TextField } from "@mui/material";
import { postNewTask } from '../api/Endpoints';
import { withTranslation } from "react-i18next";

const CreateTaskForm = ({t, updateTasks}) => {
  const formik = useFormik({
    initialValues: {
    },
    onSubmit: (values) => {
      postNewTask(values)
      .finally(() => {
        console.log(JSON.stringify(values, null, 2));
        updateTasks();
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
          label={
            <span style={{color: "#FBFEFF"}}> {t("New task")} </span>
          }
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Button style={{
          backgroundColor: "#d500f9"
        }} variant="contained" fullWidth type="submit">
        {t("Add task")}
        </Button>
      </form>
    </div>
  )
}


export default withTranslation()(CreateTaskForm);