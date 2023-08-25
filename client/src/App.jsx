import "./App.scss";
import Task from "./Task";
import { useState, useEffect } from "react";
import Web3 from "web3";
import TodoListContract from "./contracts/TaskBit.json"; // Import your contract's JSON artifact

const App = () => {
  const [todos, setTodos] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    initializeBlockchain();
  }, []);

  useEffect(() => {
    if (contract) {
      loadTodosFromBlockchain();
    }
  }, [contract]);

  const initializeBlockchain = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = TodoListContract.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          TodoListContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        const accounts = await web3Instance.eth.getAccounts();
        setAccounts(accounts);
        setContract(contractInstance);
      } catch (error) {
        console.error("Error connecting to Ethereum:", error);
      }
    } else {
      console.error("Ethereum not found");
    }
  };

  const loadTodosFromBlockchain = async () => {
    try {
      const todoCount = await contract.methods.getTodoCount().call();
      const todosFromBlockchain = [];

      for (let i = 0; i < todoCount; i++) {
        const todo = await contract.methods.todos(i).call();
        todosFromBlockchain.push({
          id: todo.id,
          name: todo.name,
          complete: todo.complete,
        });
      }

      setTodos(todosFromBlockchain);
    } catch (error) {
      console.error("Error loading todos from blockchain:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") return;

    try {
      await contract.methods.addTodo(name).send({ from: accounts[0] });
      loadTodosFromBlockchain();
      setName("");
    } catch (error) {
      console.error("Error adding todo to blockchain:", error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await contract.methods.toggleComplete(id).send({ from: accounts[0] });
      loadTodosFromBlockchain();
    } catch (error) {
      console.error("Error toggling todo complete status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await contract.methods.deleteTodo(id).send({ from: accounts[0] });
      loadTodosFromBlockchain();
    } catch (error) {
      console.error("Error deleting todo from blockchain:", error);
    }
  };

  return (
    <div className="App">
      <div className="Title">
        <h1>TaskBit</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="AddTask">
          <input
            type="text"
            placeholder="Add a new task.."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>Add</button>
        </div>
      </form>
      <div className="Tasks">
        {todos.map((todo) => (
          <Task
            key={todo.id}
            Task={todo}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
