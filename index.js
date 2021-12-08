const express = require('express');
const app = express();
const mongoose = require("mongoose");
var cors = require('cors')
const Task = mongoose.model("Task", {
    title: String,
    description: String,
    status: Boolean,
    author: String,
    deleteAt: Date,
    updateAt: Date,
    createdAt: Date
});

mongoose.connect("mongodb://127.0.0.1:27017/tpMongoDSP");

let test = new Task({title: "Hello World"});
test.save().then(() => {
    console.log("ok");
}).catch(() => {
    console.log("ko");
})
app.use(express.static("public"));
app.use(cors())
app.get("/api/task", (req,res) => {
    Task.find().then((tasks) => {
        // console.log(tasks);
        res.json(tasks);
    });
   
});

app.get("/api/task/:id", (req,res) => {
    Task.find({_id: req.params.id}).then((tasks) => {
        res.json(tasks);
    }).catch(() =>{
        res.json(null);
    })
});

app.post("/api/task", (req,res) => {
    res.end();
});

app.put("/api/task", (req,res) => {
    res.end();
});
app.patch("/api/task", (req,res) => {
    res.end();
});
app.delete("/api/task/delete/:id", async (req,res) => {
    const id = req.params.id;
    console.log("api delete");
    console.log(req.params);
    const suppr = await Tasks.deleteOne({ _id: id })
    res.json(suppr);
});
app.listen(3000, () => {
    console.log("Le serveur tourne sur le port 3000");
})