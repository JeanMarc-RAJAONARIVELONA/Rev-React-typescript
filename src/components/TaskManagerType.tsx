import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./TaskManager.css";

interface Task {
  id: string;
  title: string;
}

interface TaskManagerProps {}

export const TaskManager: React.FC<TaskManagerProps> = () => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const addTask = (): void => {
    if (title.length < 1) {
      return;
    }
    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTitle("");
  };

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks: Task[] = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input type="text" onChange={handleSearch} placeholder="Search Task" />
      </div>

      <div className="task">
        <input
          type="text"
          placeholder="Add new task"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              addTask();
            }
          }}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(ev) =>
                  updateTask(task.id, { title: ev.target.value })
                }
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
