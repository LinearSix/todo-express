
exports.up = async function(knex, Promise) {
    await knex.schema.createTable('tasks', function(table) {
        table.increments('_id').primary();
        table.string('name');
        table.boolean('completed');
        table.dateTime('createTime');
        table.dateTime('completeTime');
    })
};

exports.down = function(knex, Promise) {
  
};
