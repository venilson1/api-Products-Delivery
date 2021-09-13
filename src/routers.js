const express = require("express");
const router = express.Router();
const upload = require("./middleware/upload");
const auth = require("./middleware/auth");
const HomeController = require("./controllers/HomeController");
const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");
const ProductController = require("./controllers/ProductController");
const ClientController = require("./controllers/ClientController");

router.get("/", HomeController.index);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.post("/users", UserController.newUser);
router.patch("/users/:id", UserController.edit);
router.delete("/users/:id", UserController.remove);

router.post("/auth", AuthController.login);

router.get("/products", ProductController.index);
router.post("/products", upload.single("path"), ProductController.newProduct);
router.get("/products/:id", ProductController.getProductById);
router.patch("/products/:id", upload.single("path"), ProductController.edit);
router.delete("/products/:id", ProductController.remove);

router.get("/clients", ClientController.index);
router.post("/clients", ClientController.newClient);
router.get("/clients/:id", ClientController.getClientById);

module.exports = router;
