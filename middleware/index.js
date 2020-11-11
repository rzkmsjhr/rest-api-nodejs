var express = require('express');
var auth = require('./auth');
const verify_role = require('./verify');
var router = express.Router();

router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);

router.get('/api/v1/secret', verify_role(), auth.secretpage)

module.exports = router;