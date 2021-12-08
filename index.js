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

let test = new Task({title: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)});
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

app.post("/api/task", await (req,res) => {
    console.log("entré dans le post")
    console.log(req);
    const title = req.body.title;
    const content = req.body.content;

    if (!title || !content) {
        res.send('Il manque un argument')
        return;
    }
    console.log(title);
    console.log(content);
    const new_task = new Tasks({
        title: title,
        content: content
    })

    await new_task.save();
    res.json(new_task);
    return;
});

app.put("/api/task", (req,res) => {
    res.end();
});
app.patch("/api/task", (req,res) => {
    res.end();
});
app.delete("/api/task/remove/:id", async(req,res) => {
    const id = req.params.id;
    Task.findOne({_id: req.params.id})
        .then(task => {
            Task.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
});
app.listen(3000, () => {
    console.log("Le serveur tourne sur le port 3000");
})