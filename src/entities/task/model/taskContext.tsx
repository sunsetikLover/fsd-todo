"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TaskContextValue {
  tasks: Task[];
  addTask: (name: string) => void;
  updateTask: (id: string, name: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}

const LOCAL_STORAGE_KEY = "tasks";

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : null;

    if (Array.isArray(parsedTasks) && parsedTasks.length > 0) {
      setTasks(parsedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name: string) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), name, completed: false },
    ]);
  };

  const updateTask = (id: string, name: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, name } : task))
    );
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, toggleTask, removeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskStore = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskStore must be used within a TaskProvider");
  }
  return context;
};