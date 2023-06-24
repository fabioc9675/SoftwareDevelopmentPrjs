import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div>
      <Link to="/tasks">Task App</Link>
      <Link to="/task-create">create task</Link>
    </div>
  );
}
