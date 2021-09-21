const express = require('express');
const router = express.Router();
const crud = require('../lib/crud');

router.get('/', async (req, res) => {
    res.json(await crud.get_all());
    //res.sendFile('index.html');
});

router.post('/', async (req, res) => {
    res.json(await crud.add_row());
    //res.sendFile('index.html');
});

router.put('/', async (req, res) => {
    res.json(await crud.edit_row());
    //res.sendFile('index.html');
});

router.delete('/', async (req, res) => {
    res.json(await crud.delete_row());
    //res.sendFile('index.html');
});

module.exports = router;
