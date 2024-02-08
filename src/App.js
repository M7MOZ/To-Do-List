import "./index.css";
import { useState } from "react";
export default function App() {
  const [tasks, setTasks] = useState([]);
  function handleAddTask(task) {
    setTasks([...tasks, task]);
  }
  function handleTogleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }
  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="App">
      <Header></Header>
      <main className="main">
        <Form onAddTask={handleAddTask}></Form>
        <Tasks
          tasks={tasks}
          onTogleTask={handleTogleTask}
          onDeleteTask={handleDeleteTask}
        ></Tasks>
      </main>
      <Footer tasks={tasks} />
    </div>
  );
}
function Header() {
  return <h1 className="header">todo list</h1>;
}
function Form({ onAddTask }) {
  const [taskName, setTaskName] = useState("");
  return (
    <div className="form">
      <input
        type="text"
        placeholder="First Task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button
        className="add-btn"
        onClick={() =>
          taskName !== ""
            ? (onAddTask({
                taskName,
                date: new Date().toDateString(),
                done: false,
                id: Math.random(),
              }),
              setTaskName(""))
            : {}
        }
      >
        Add Task
      </button>
    </div>
  );
}
function Tasks({ tasks, onTogleTask, onDeleteTask }) {
  const [sort, setSort] = useState("input");
  if (!tasks.length) return;
  let sortedTasks;
  if (sort === "input") sortedTasks = tasks;

  if (sort === "desc")
    sortedTasks = tasks
      .slice()
      .sort((a, b) => a.taskName.localeCompare(b.taskName));
  if (sort === "done")
    sortedTasks = tasks.slice().sort((a, b) => Number(a.done) - Number(b.done));
  return (
    <main>
      <div className="tasks">
        {sortedTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onTogleTask={onTogleTask}
            onDeleteTask={onDeleteTask}
          ></Task>
        ))}
      </div>
      <div>
        <select
          className="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value={"input"}>sort by input order</option>
          <option value={"desc"}>sort by description</option>
          <option value={"done"}>sort by done</option>
        </select>
      </div>
    </main>
  );
}

function Task({ task, onTogleTask, onDeleteTask }) {
  return (
    <div className="task">
      <input
        type="checkbox"
        value={task.done}
        onChange={() => onTogleTask(task.id)}
      />
      <div className="task-info">
        <span
          className="task-title"
          style={task.done ? { textDecoration: "line-through" } : {}}
        >
          {task.taskName}
        </span>
        <p className="task-date">{task.date}</p>
      </div>
      <div className="delet-btn" onClick={() => onDeleteTask(task.id)}>
        X
      </div>
    </div>
  );
}

function Footer({ tasks }) {
  const numTasks = tasks.length;
  if (!numTasks) return <footer>Start Tasking!</footer>;
  const dones = tasks.filter((task) => task.done).length;
  if (numTasks === dones)
    return <footer>You've combleted all your tasks!</footer>;

  return (
    <footer>
      <span>
        {numTasks > 1
          ? `you have ${numTasks} Tasks, ${dones} of them are done`
          : "you have one uncompleted task"}
      </span>
    </footer>
  );
}
