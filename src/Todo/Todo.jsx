import React, { useEffect, useState } from "react";
import "./Todo.css";
import { List } from "./List";

export const Todo = () => {
  const [inputValue, setInputValue] = useState({ content: "", checked: false });
  const [task, setTask] = useState([]);
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("list");
    if (savedTasks) {
      setTask(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCheck = (index) => {
    const updatedTasks = task.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setTask(updatedTasks);
    localStorage.setItem("list", JSON.stringify(updatedTasks));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.content.trim()) return;

    const ifMatch = task.find((item) => item.content === inputValue.content);
    if (ifMatch) return;

    const updatedTasks = [
      ...task,
      { id: Date.now(), content: inputValue.content, checked: false },
    ];
    setTask(updatedTasks);
    localStorage.setItem("list", JSON.stringify(updatedTasks));
    setInputValue({ content: "", checked: false });
  };

  const handleDelete = (index) => {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTask(updatedTasks);
    localStorage.setItem("list", JSON.stringify(updatedTasks));
  };

  const handleClearAll = () => {
    setTask([]);
    localStorage.removeItem("list");
  };

  return (
    <>
      <section className="form">
        <header>
          <h1>Todo List</h1>
        </header>
        <h3>{dateTime}</h3>
        <form className="form-input" onSubmit={handleSubmit}>
          <div className="input-div">
            <input
              type="text"
              className="todo-input"
              autoComplete="off"
              value={inputValue.content}
              onChange={(e) =>
                setInputValue({ ...inputValue, content: e.target.value })
              }
            />
          </div>
          <div className="add-btn">
            <button type="submit" className="btn">
              Add task
            </button>
          </div>
        </form>
      </section>

      <section>
        <List
          task={task}
          handleDelete={handleDelete}
          handleClearAll={handleClearAll}
          handleCheck={handleCheck}
        />
      </section>
    </>
  );
};
