const { Router } = require('express');
const taskCtrl = require('../controllers/taskController');

const taskRouter = Router();

taskRouter.post('/', taskCtrl.create);
taskRouter.patch('/:id', taskCtrl.done);
taskRouter.delete('/:id', taskCtrl.delete);
taskRouter.get('/', taskCtrl.get)

module.exports = taskRouter;