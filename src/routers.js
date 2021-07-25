const express = require("express");
const router = express.Router();
const HomeController = require("./controllers/HomeController");
const UserController = require('./controllers/UserController')
const AuthController = require("./controllers/AuthController");
const ProductController = require("./controllers/ProductController");
const auth = require("./middleware/auth")

router.get('/', HomeController.index);
router.get('/users', auth, UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.newUser);
router.put('/users/:id', UserController.edit);
router.delete('/users/:id', UserController.remove);

router.post('/auth', AuthController.login);

router.get('/products', ProductController.index);
router.post('/products', ProductController.newProduct);

module.exports = router;