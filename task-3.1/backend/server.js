const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let todos = [];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const todo = { id: Date.now(), text: req.body.text, completed: false };
    todos.push(todo);
    res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.text = text;
        todo.completed = completed;
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
