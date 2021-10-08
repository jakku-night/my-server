const express = require('express');
const router = express.Router();
const crud = require('../lib/crud');

router.get('/', async (req, res) => {
    res.sendFile('index.html');
});

router.post('/', async (req, res) => {
    const { task, description } = req.body;
    var new_data = {};
    if(task === '' || description === ''){
        new_data = {};
    }else{
        new_data = {
            task,
            description
        };
    }
    res.json(await crud.add_row('tasks', new_data));
    //res.sendFile('index.html');
});

router.put('/', async (req, res) => {
    const { task, description, id } = req.body;
    console.log(task, description, id);
    var new_data = {};
    if(task === '' || description === '' || id === ''){
        new_data = {};
    }else{
        new_data = {
            task,
            description
        };
    }
    res.json(await crud.edit_row('tasks', new_data, id));
    //res.sendFile('index.html');
});

router.delete('/', async (req, res) => {
    res.json(await crud.delete_row('tasks'));
    //res.sendFile('index.html');
});

module.exports = router;
