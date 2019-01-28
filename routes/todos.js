const express = require('express'),
        router = express.Router(),
        db = require("../models"),
        helpers = require("../helpers/todos");

router.route('/')
    .get(helpers.getTodos)   // router.get('/', )
    .post(helpers.createTodo)   // router.post('/', )

router.route('/:todoId')
    .get(helpers.getTodo)  //router.get('/:todoId', )
    .put(helpers.updateTodo)  //router.put("/:todoId", )
    .delete(helpers.deleteTodo)  //router.delete("/:todoId", )



module.exports = router;