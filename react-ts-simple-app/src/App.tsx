import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Task } from "./interfaces/Task";
import logo from "./logo.svg";

interface Props {
  // permite crear un tipo de dato para controlar la entrada a App
  title?: string; // Con el signo de ? indica que la propiedad no es requerida
}

function App({ title }: Props) {
  const [tasks, setTasks] = useState<Task[]>([
    // <> dentro de ese simbolo se dice que estamos pasando un arreglo de tareas deacuerdo a la interface creada
    {
      id: 1,
      title: "Learn React",
      description: "Learn React",
      completed: false,
    },
  ]);

  const getCurrentTimeStamp = (): number => new Date().getTime();

  // funcion para añadir tareas al arreglo
  const addNewTask = (task: Task) => {
    setTasks([
      ...tasks,
      { ...task, id: getCurrentTimeStamp(), completed: false },
    ]); // copio lo que haya en task y agrego el nuevo task
  };

  // funcion para eliminar tarea
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-dark text-white" style={{ height: "100vh" }}>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <a href="/" className="navbar-brand">
            <img src={logo} alt="React Logo" style={{ width: "4rem" }} />
            {title && <h1>{title}</h1>}{" "}
            {/*Valida si existe el titulo al ser opcional */}
          </a>
        </div>
      </nav>

      <main className="container p-4">
        <div className="row">
          <div className="col-md-4">
            <TaskForm addNewTask={addNewTask} />
          </div>
          <div className="col-md-8">
            <div className="row">
              <TaskList tasks={tasks} deleteTask={deleteTask} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
