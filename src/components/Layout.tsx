import React from "react";
import { Link } from "react-router-dom";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <header className="header">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </header>
      <main className="main">{props.children}</main>
      <footer></footer>
    </>
  );
}
