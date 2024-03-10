import { useState } from "react";
import { nanoid } from "nanoid";

interface Task {
  id: string;
  title: string;
}

interface TaskManagerActions {
  addTask: (title: string) => void;
  completeTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
}

interface TaskManagerState extends TaskManagerActions {
  tasks: Task[];
  filteredTasks: Task[];
  setSearchKeyword: (keyword: string) => void;
}

export const useTaskManager = (): TaskManagerState => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const addTask = (title: string): void => {
    if (title.length < 1) {
      return;
    }
    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const completeTask = (id: string): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, updatedTask: Partial<Task>): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const filteredTasks: Task[] = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    tasks,
    filteredTasks,
    addTask,
    completeTask,
    updateTask,
    setSearchKeyword,
  };
};
