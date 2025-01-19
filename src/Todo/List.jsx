import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import "./List.css";

export const List = ({ task, handleDelete, handleClearAll, handleCheck }) => {
  return (
    <>
      <ul className="unList">
        {task.map((item, index) => (
          <li key={item.id} className="list">
            <span className={item.checked ? "line-through" : ""}>
              {item.content}
            </span>
            <button
              className="btn-icon"
              onClick={() => handleCheck(index)}
            >
              <IoMdCheckmarkCircleOutline className="check-icon" />
            </button>
            <button
              onClick={() => handleDelete(index)}
              className="btn-icon"
            >
              <MdDeleteForever className="delete-icon" />
            </button>
          </li>
        ))}
      </ul>
      {task.length ? (
        <button onClick={handleClearAll} className="btn-clear">
          Clear
        </button>
      ) : null}
    </>
  );
};
