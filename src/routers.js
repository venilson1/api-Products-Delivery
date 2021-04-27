const express = require("express");
const router = express.Router();
const HomeController = require("./controllers/HomeController");
const UserController = require('./controllers/UserController')

router.get('/', HomeController.index);
router.get('/users', UserController.index);
router.post('/users', UserController.create);

module.exports = router;