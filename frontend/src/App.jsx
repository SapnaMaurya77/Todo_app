import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  // Form States
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/tasks";

  // ================= GET TASKS =================

  const getTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= ADD TASK =================

  const addTask = async () => {
    if (title.trim() === "") {
      alert("Please enter task");
      return;
    }

    try {
      await axios.post(API, {
        title,
        status,
      });

      setTitle("");
      setStatus("Pending");
      getTasks();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE TASK =================

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT TASK =================

  const editTask = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setStatus(task.status);
  };

  // ================= UPDATE TASK =================

  const updateTask = async () => {
    try {
      await axios.put(`${API}/${editId}`, {
        title,
        status,
      });

      setTitle("");
      setStatus("Pending");
      setEditId(null);

      getTasks();

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container">

      <h1>Todo App</h1>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Enter Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

        {editId ? (
          <button onClick={updateTask}>
            Update Task
          </button>
        ) : (
          <button onClick={addTask}>
            Add Task
          </button>
        )}

      </div>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {tasks.map((task) => (

            <tr key={task.id}>

              <td>{task.id}</td>

              <td>{task.title}</td>

              <td>{task.status}</td>

              <td>
                <button onClick={() => editTask(task)}>
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    marginLeft: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Delete
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;