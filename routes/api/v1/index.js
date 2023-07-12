const express = require('express');
const router= express.Router();

router.use('/habit',require('./habit'));

module.exports = router;