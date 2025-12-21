const express = require('express');
const upload = require('../middleware/multer.middleware');
const { File } = require('buffer');
const user = require('../controllers/user.controllers')
const router = express.Router();
router.post('/upload',upload.single("avatar"),user)
module.exports = router