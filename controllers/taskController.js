const createError = require('http-errors');
const { Task } = require('../models');

module.exports.create = async (req, res, next) => {
  try {
    const { body } = req;
    const task =  await Task.create(body);
    if (!task) {
      return next(createError(400));
    }
    res.status(200).send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.done = async (req, res, next) => {
  try {
    const { params: {id} } = req;
    const task = await Task.findByPk(id);

    const [rowsCount, [updatedTask]] = await Task.update({isDone: !task.isDone}, {
      where: { id },
      returning: true,
    });
    
    if (!task || rowsCount !== 1) {
      return next(createError(400));
    }

    res.status(200).send(updatedTask);
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const { params: {id} } = req;
    
    const rowsCount = await Task.destroy({ where: { id } });

    if (rowsCount !== 1) {
      return next(createError(400));
    }

    res.status(200).send({id});
  } catch (err) {
    next(err);
  }
};

module.exports.get = async (req, res, next) => {
  try {
    const tasks = await Task.findAll();

    if (!tasks) {
      return next(createError(400));
    }

    res.status(200).send(tasks);
  } catch (err) {
    next(err);
  }
};

