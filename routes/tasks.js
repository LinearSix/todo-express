const knex = require('../db.js');

/*
 * GET users listing.
 */

exports.list = async function(req, res, next){
  try {
    const tasks = await knex.select().table('tasks').where('completed', '=', false);
    res.render('tasks', {
      title: 'Todo List',
      tasks: tasks || []
    });
  } catch(error) {
    return next(error);
  }
};

exports.add = async function(req, res, next){
  if (!req.body || !req.body.name) return next(new Error('No data provided.'));

  try {
    const task = await knex('tasks').insert({
      name: req.body.name,
      createTime: new Date(),
      completed: false
    });
    console.info('Added %s with id=%s', task.name, task._id);
    res.redirect('/tasks');
  } catch(ex) {
    next(ex);
  }
};

exports.markAllCompleted = async function(req, res, next) {
  if (!req.body.all_done || req.body.all_done !== 'true') return next();
  try {
    const count = await knex('tasks')
      .where('completed', '=', false)
      .update({
        completeTime: new Date(),
        completed: true
      });
    console.info('Marked %s task(s) completed.', count);
    res.redirect('/tasks');
  } catch(error) {
    return next(error);
  }
};

exports.completed = async function(req, res, next) {
  try {
    const tasks = await knex('tasks').where('completed', '=', true);
    res.render('tasks_completed', {
      title: 'Completed',
      tasks: tasks || []
    });
  } catch(error) {
    return next(error);
  }
};

exports.markCompleted = async function(req, res, next) {
  if (!req.body.completed) return next(new Error('Param is missing.'));
  const completed = req.body.completed === 'true';
  try {
    const count = await knex('tasks')
      .where('_id', '=', req.body.id)
      .update({completeTime: completed ? new Date() : null, completed: completed});
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Marked task %s with id=%s completed.', req.body.name, req.body.id);
    res.redirect('/tasks');
  } catch(error) {
    return next(error);
  }
};

exports.del = async function(req, res, next) {
  try {
    const count = await knex('tasks').where('_id', req.params.task_id).del()
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Deleted task with id=%s completed.', req.params.task_id);
    res.status(204).send();
  } catch(error) {
    return next(error);
  }
};
