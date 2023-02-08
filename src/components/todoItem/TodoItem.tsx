import React from "react";
import styles from "./todoitem.module.css";
import clsx from "clsx";

interface IProps {
  id: string | number;
  text: string;
  checked: boolean;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  onChangeChecked?: (id: string | number) => void;
}

export default function TodoItem(props: IProps) {
  const [showTaskMenu, setShowTaskMenu] = React.useState(false);
  const { id, text, checked, onEdit, onDelete, onChangeChecked } = props;
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

  return (
    <li className={styles.task}>
      <label onClick={() => onChangeChecked?.(id)}>
        <input type="checkbox" />
        <p className={clsx(checked && styles.checked)}>{text}</p>
      </label>
      <div className={styles.settings} ref={settingsElRef}>
        <i
          className="uil uil-ellipsis-h"
          onClick={() => setShowTaskMenu((prev) => !prev)}
        ></i>
        <ul className={clsx(styles["task-menu"], showTaskMenu && styles.show)}>
          <li onClick={() => onEdit?.(id)}>
            <i className="uil uil-pen"></i>Edit
          </li>
          <li onClick={() => onDelete?.(id)}>
            <i className="uil uil-trash"></i>Delete
          </li>
        </ul>
      </div>
    </li>
  );
}
