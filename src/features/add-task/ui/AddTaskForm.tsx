"use client";

import { useTaskStore } from "@/entities/task/model/taskContext";
import { Formik, Form, Field } from "formik";
import { TextField, Button } from "@mui/material";
import { addTaskScheme } from "@/shared/lib/schemes";
import s from './AddTaskForm.module.css'

const taskInitialValues = {
  name: "",
}

export const AddTaskForm = () => {
  const { addTask } = useTaskStore();

  return (
    <Formik
      initialValues={taskInitialValues}
      validationSchema={addTaskScheme}
      onSubmit={(values, { resetForm }) => {
        addTask(values.name);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className={s.container}>
            <Field
              as={TextField}
              name="name"
              label="Новая задача"
              variant="outlined"
              size="small"
              fullWidth
              error={Boolean(errors.name && touched.name)}
              helperText={touched.name && errors.name}
              InputProps={{
                classes: { root: s.textField },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              className={s.button}
            >
              Добавить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
