import "./App.scss";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Task = ({ Task, handleToggle, handleDelete }) => {
  const toggleTask = () => {
    handleToggle(Task.id);
  };

  const deleteTask = () => {
    handleDelete(Task.id);
  };

  return (
    <div className="Task">
      <div className={Task.complete ? "Task-Text Completed" : "Task-Text"}>
        <p>{Task.name}</p>
      </div>
      <div className="Task-Buttons">
        <button onClick={toggleTask}>
          {Task.complete ? "Ongoing" : "Done"}
        </button>
        <div className="Task-Delete" onClick={deleteTask}>
          <DeleteForeverIcon />
        </div>
      </div>
    </div>
  );
};

export default Task;
