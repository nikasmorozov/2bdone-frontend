import { useFormik } from 'formik';
import { Button, TextField } from "@mui/material";
import { postNewTask } from '../../api/Endpoints';
import { withTranslation } from "react-i18next";

const CreateTaskForm = ({t, initialValue}) => {
  const formik = useFormik({
    initialValues: {
      description: initialValue
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
          label={t("New task")}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
        {t("Add task")}
        </Button>
      </form>
    </div>
  )
}


export default withTranslation()(CreateTaskForm);