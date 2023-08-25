import "./App.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Task = ({ task, handleToggle, handleDelete }) => {
  const toggleTask = () => {
    handleToggle(task.id);
  };

  const deleteTask = () => {
    handleDelete(task.id);
  };

  return task.name === "" ? null : (
    <div className="Task">
      <div className={task.complete ? "Task-Text Completed" : "Task-Text"}>
        <p>{task.name}</p>
      </div>
      <div className="Task-Buttons">
        <button onClick={toggleTask}>
          {task.complete ? "Ongoing" : "Done"}
        </button>
        <div className="Task-Delete" onClick={deleteTask}>
          <DeleteForeverIcon />
        </div>
      </div>
    </div>
  );
};

export default Task;
