import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/profile", element: <Profile /> },
];

export default function App() {
  return (
    <Router>
      <Routes>
        {routes.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={<Layout>{item.element}</Layout>}
          />
        ))}
      </Routes>
    </Router>
  );
}
