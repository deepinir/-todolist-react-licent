import React from "react";
import styles from "./todolist.module.css";
import TodoItem from "../todoItem/TodoItem";

export default function Todolist() {
  return (
    <div className={styles.container}>
      <input />
      {[1, 2, 3, 4, 5].map((_, index) => (
        <TodoItem key={index} />
      ))}
      <hr />
    </div>
  );
}
