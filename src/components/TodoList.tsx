import React from "react";
import TodoItem from "./TodoItem";
import { axios } from "../services/axios";
import { Todo } from "../services/types/todo.type";

type Status = "all" | "completed" | "pending";

export default function Todolist() {
  const [description, setDescription] = React.useState("");
  const [todos, setTodos] = React.useState<Todo[]>();
  const [status, setStatus] = React.useState<Status>("all");
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    fetchTodos();
  }, []);

  React.useEffect(() => {
    description.length === 0 && setIsEditMode(false);
  }, [description]);

  const fetchTodos = React.useCallback(() => {
    axios.get<Todo[]>("tasks").then(({ data }) => setTodos(data));
  }, []);

  const handleSubmit = () => {
    if (!description.trim().length) {
      return;
    }
    if (!isEditMode) {
      axios.post("tasks", { description, completed: false }).then(() => {
        setDescription("");
        fetchTodos();
      });
    } else {
      axios.put(`tasks/${activeId}`, { description }).then(() => {
        setDescription("");
        fetchTodos();
      });
    }
  };

  const handlePrepareToUpdate = (id: number, description: string) => {
    setDescription(description);
    setIsEditMode(true);
    inputRef.current?.focus();
    setActiveId(id);
  };

  const handleUpdateStatus = (id: number, checked: boolean) => {
    axios.put(`tasks/${id}`, { completed: checked }).then(() => {
      fetchTodos();
    });
  };

  const handleDelete = (id: number) =>
    axios.delete(`tasks/${id}`).then(() => fetchTodos());

  const statusButtons: { label: string; status: Status }[] = [
    { label: "All", status: "all" },
    { label: "Pending", status: "completed" },
    { label: "Completed", status: "pending" },
  ];

  const filteredTodos =
    status === "all"
      ? todos
      : todos?.filter((todo) =>
          status === "completed"
            ? todo.completed === true
            : todo.completed === false
        );

  return (
    <div className="wrapper">
      <div className="task-input">
        <img src="bars-icon.svg" alt="icon" />
        <input
          placeholder="Add a new task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => e.code === "Enter" && handleSubmit()}
          ref={inputRef}
        />
        <button onClick={handleSubmit}>{isEditMode ? "Update" : "Add"}</button>
      </div>
      <div className="controls">
        <div className="filters">
          {statusButtons.map(({ label, ...item }) => (
            <span
              key={label}
              onClick={() => setStatus(item.status)}
              className={item.status === status ? "active" : ""}
            >
              {label}
            </span>
          ))}
        </div>
        <button className="clear-btn">Clear All</button>
      </div>
      <ul className="task-box">
        {filteredTodos?.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            description={item.description}
            checked={item.completed}
            onChangeChecked={handleUpdateStatus}
            onDelete={handleDelete}
            onEdit={handlePrepareToUpdate}
          />
        ))}
      </ul>
    </div>
  );
}
