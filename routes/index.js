const express = require('express');
const router = express.Router();
const crud = require('../lib/crud');

router.get('/', async (req, res) => {
    await crud.create_table('rust');
    console.log('[GET]: http://localhost:3000/');
});

module.exports = router;
