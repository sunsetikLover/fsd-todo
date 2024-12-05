"use client";

import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { addTaskScheme } from "@/shared/lib/schemes";
import { useTaskStore } from "@/entities/task/model/taskContext";

interface TaskDialogProps {
  open: boolean;
  taskId: string | null;
  initialName: string;
  onClose: () => void;
}

export const TaskDialog = ({ open, taskId, initialName, onClose }: TaskDialogProps) => {
  const { updateTask } = useTaskStore();

  const handleSubmit = (values: { name: string }) => {
    if (taskId) {
      updateTask(taskId, values.name);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Редактировать задачу</DialogTitle>
      <Formik
        initialValues={{ name: initialName }}
        validationSchema={addTaskScheme}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <Field
                as={TextField}
                name="name"
                label="Название задачи"
                variant="outlined"
                fullWidth
                size="small"
                error={Boolean(errors.name && touched.name)}
                helperText={touched.name && errors.name}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="secondary">
                Отменить
              </Button>
              <Button type="submit" color="primary">
                Сохранить
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
