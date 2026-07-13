const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());



// ================= GET ALL TASKS =================

app.get("/tasks", (req, res) => {

    db.query("SELECT * FROM tasks", (err, result) => {

        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            res.json(result);
        }

    });

});




// ================= ADD TASK =================

app.post("/tasks", (req, res) => {

    const { title, status } = req.body;


    const sql = 
    "INSERT INTO tasks(title,status) VALUES(?,?)";


    db.query(sql, [title, status], (err, result) => {

        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            res.json({
                message: "Task Added Successfully"
            });
        }

    });

});




// ================= DELETE TASK =================

app.delete("/tasks/:id", (req, res) => {

    const id = req.params.id;


    db.query(
        "DELETE FROM tasks WHERE id=?",
        [id],

        (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.json({
                    message: "Task Deleted Successfully"
                });
            }

        }
    );

});




// ================= UPDATE TASK =================

app.put("/tasks/:id", (req, res) => {

    const id = req.params.id;

    const { title, status } = req.body;


    const sql =
    "UPDATE tasks SET title=?, status=? WHERE id=?";


    db.query(
        sql,
        [title, status, id],

        (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.json({
                    message:"Task Updated Successfully"
                });
            }

        }
    );

});




// SERVER START

app.listen(5000, () => {

    console.log("Server running on port 5000");

});