"use client";

import { List, ListItem, Checkbox, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useTaskStore } from "@/entities/task/model/taskContext";
import { TaskDialog } from "../task-dialog/TaskDialog";

export const TaskList = () => {
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [taskName, setTaskName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const { tasks, toggleTask, removeTask } = useTaskStore();

  const openEditDialog = (taskId: string, name: string) => {
    setEditTaskId(taskId);
    setTaskName(name);
    setOpenDialog(true);
  };

  const closeEditDialog = () => {
    setEditTaskId(null);
    setTaskName("");
    setOpenDialog(false);
  };

  return (
    <>
      <List>
        {tasks.length === 0 ? (
          <Typography>Задач пока нет</Typography>
        ) : (
          tasks.map((task) => (
            <ListItem
              key={task.id}
              divider
              secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => openEditDialog(task.id, task.name)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => removeTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <Typography style={{ flexGrow: 1 }}>{task.name}</Typography>
            </ListItem>
          ))
        )}
      </List>

      <TaskDialog
        open={openDialog}
        taskId={editTaskId}
        initialName={taskName}
        onClose={closeEditDialog}
      />
    </>
  );
};
