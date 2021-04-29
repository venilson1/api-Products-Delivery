const express = require("express");
const router = express.Router();
const HomeController = require("./controllers/HomeController");
const UserController = require('./controllers/UserController')

router.get('/', HomeController.index);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.newUser);
router.put('/users/:id', UserController.edit);

module.exports = router;