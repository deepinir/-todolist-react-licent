import React from "react";
import clsx from "clsx";

interface IProps {
  id: number;
  description: string;
  checked: boolean;
  onEdit?: (id: number, description: string) => void;
  onDelete?: (id: number) => void;
  onChangeChecked?: (id: number, checked: boolean) => void;
}

export default function TodoItem(props: IProps) {

  const [showTaskMenu, setShowTaskMenu] = React.useState(false);
  const { id, description, checked, onEdit, onDelete, onChangeChecked } = props;
  const settingsElRef = React.useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    const listener = (event: any) => {
      if (!settingsElRef.current?.contains(event.target as Node | null)) {
        setShowTaskMenu(false);
      }
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, []);

  const handleDelete = () => {
    setShowTaskMenu(false);
    onDelete?.(id);
  };

  const handleEdit = () => {
    setShowTaskMenu(false);
    onEdit?.(id, description);
  };

  return (
    <li className="task">
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChangeChecked?.(id, e.target.checked)}
        />
        <p className={clsx(checked && "checked")}>{description}</p>
      </label>
      <div className="settings" ref={settingsElRef}>
        <i
          className="uil uil-ellipsis-h"
          onClick={() => setShowTaskMenu((prev) => !prev)}
        ></i>
        <ul className={clsx("task-menu", showTaskMenu && "show")}>
          <li onClick={handleEdit}>
            <i className="uil uil-pen"></i>Edit
          </li>
          <li onClick={handleDelete}>
            <i className="uil uil-trash"></i>Delete
          </li>
        </ul>
      </div>
    </li>
  );
}
