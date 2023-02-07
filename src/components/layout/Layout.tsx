import React from "react";
import styles from "./layout.module.css";
import { Link } from "react-router-dom";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <header className={styles.header}>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </header>
      <main className={styles.main}>{props.children}</main>
      <footer></footer>
    </>
  );
}
