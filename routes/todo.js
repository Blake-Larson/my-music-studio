const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');

router.get('/', todoController.getTodos);

router.post('/createTodo', todoController.createTodo);

router.put('/updateTodo', todoController.updateTodo);

router.delete('/deleteTodo', todoController.deleteTodo);

module.exports = router;
