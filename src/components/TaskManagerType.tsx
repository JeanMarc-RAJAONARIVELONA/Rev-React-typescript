import React from "react";
import { useTaskManager } from "./UseTaskManager";
import "./TaskManager.css";

export const TaskManager: React.FC = () => {
  const { filteredTasks, addTask, completeTask, updateTask, setSearchKeyword } =
    useTaskManager();

  const [title, setTitle] = React.useState("");

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(ev.target.value);
  };

  return (
    <div className="container">
      <h1>Task Manager final</h1>

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
              addTask(title);
              setTitle("");
            }
          }}
        />
        <button
          onClick={() => {
            addTask(title);
            setTitle("");
          }}
        >
          Add Task
        </button>
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
