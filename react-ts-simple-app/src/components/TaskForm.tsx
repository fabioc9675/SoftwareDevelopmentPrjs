import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Task } from "../interfaces/Task";

interface Props {
  addNewTask: (task: Task) => void; // asi se define una funcion como propiedad y no retorna nada, recibe como parametro una task
}

type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>; // creacion de un tipo de dato para las entradas de texto

const initialState = {
  title: "",
  description: "",
};

function TaskForm({ addNewTask }: Props) {
  const [task, setTask] = useState(initialState);
  const inputTitle = useRef<HTMLInputElement>(null);

  const handleInputChange = ({
    target: { name, value },
  }: HandleInputChange) => {
    // el evento de cambio e viene de un elemento HTMLInput o HTMLTextArea es tipiado desde e.target
    setTask({ ...task, [name]: value });
  };

  const handleNewTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // cancela el almacenamiento
    addNewTask(task);
    setTask(initialState);
    inputTitle.current?.focus();
  };

  return (
    <div className="card card-body bg-secondary text-dark">
      <h1>Add Task</h1>

      <form onSubmit={handleNewTask}>
        <input
          type="text"
          placeholder="Write a title"
          name="title"
          className="form-control mb-3 rounded-0 shadow-none border-0"
          onChange={handleInputChange}
          value={task.title}
          autoFocus
          ref={inputTitle}
        />
        <textarea
          name="description"
          rows={2}
          placeholder="Write a description"
          className="form-control mb-3 shadow-none border-0"
          onChange={handleInputChange}
          value={task.description}
        ></textarea>

        <button className="btn-primary">
          Save
          <AiOutlinePlus />
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
