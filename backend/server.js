const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// ====================== GET ALL TASKS ======================
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});


// ====================== ADD TASK ======================
app.post("/tasks", (req, res) => {

  const { title, status, dueDate } = req.body;

  const sql = "INSERT INTO tasks(title, status, dueDate) VALUES (?, ?, ?)";

  db.query(sql, [title, status, dueDate], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Task Added Successfully"
    });

  });

});
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});
app.post("/tasks", (req, res) => {

  const { title, status, dueDate } = req.body;

  const sql = "INSERT INTO tasks(title, status, dueDate) VALUES (?, ?, ?)";

  db.query(sql, [title, status, dueDate], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json("Task Added Successfully");

  });

});
app.put("/tasks/:id", (req, res) => {

  const id = req.params.id;
  const { title, status, dueDate } = req.body;

  const sql = "UPDATE tasks SET title=?, status=?, dueDate=? WHERE id=?";

  db.query(sql, [title, status, dueDate, id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json("Task Updated Successfully");

  });

});
app.delete("/tasks/:id", (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM tasks WHERE id=?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json("Task Deleted Successfully");

  });

});

// ====================== SERVER ======================
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});