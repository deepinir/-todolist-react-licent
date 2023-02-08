import React from "react";
import styles from "./todolist.module.css";
import TodoItem from "../todoItem/TodoItem";

export default function Todolist() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["task-input"]}>
        <img src="bars-icon.svg" alt="icon" />
        <input type="text" placeholder="Add a new task" />
      </div>
      <div className={styles.controls}>
        <div className={styles.filters}>
          <span className="active" id="all">
            All
          </span>
          <span id="pending">Pending</span>
          <span id="completed">Completed</span>
        </div>
        <button className={styles["clear-btn"]}>Clear All</button>
      </div>
      <ul className={styles["task-box"]}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <TodoItem key={index} id={index} text="name" checked={false} />
        ))}
      </ul>
    </div>
  );
}
