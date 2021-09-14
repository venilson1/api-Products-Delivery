const express = require("express");
const router = express.Router();
const upload = require("./middleware/upload");
const authAdmin = require("./middleware/auth");
const HomeController = require("./controllers/HomeController");
const UserController = require("./controllers/UserController");
const AuthAdminController = require("./controllers/AuthAdminController");
const ProductController = require("./controllers/ProductController");
const ClientController = require("./controllers/ClientController");
const OrderController = require("./controllers/OrderController");

router.get("/", authAdmin, HomeController.index);
router.get("/users", authAdmin, UserController.getAllUsers);
router.get("/users/:id", authAdmin, UserController.getUserById);
router.post("/users", authAdmin, UserController.newUser);
router.patch("/users/:id", authAdmin, UserController.edit);
router.delete("/users/:id", authAdmin, UserController.remove);

router.post("/auth/admin", AuthAdminController.login);

router.get("/products", authAdmin, ProductController.index);
// prettier-ignore
router.post("/products", authAdmin, upload.single("path"), ProductController.newProduct);
router.get("/products/:id", authAdmin, ProductController.getProductById);
// prettier-ignore
router.patch("/products/:id", authAdmin, upload.single("path"), ProductController.edit);
router.delete("/products/:id", authAdmin, ProductController.remove);

router.get("/clients", authAdmin, ClientController.index);
router.post("/clients", ClientController.newClient);
router.get("/clients/:id", authAdmin, ClientController.getClientById);
router.patch("/clients/:id", ClientController.edit);
router.delete("/clients/:id", ClientController.remove);

router.get("/orders", authAdmin, OrderController.index);
router.post("/orders", OrderController.newOrder);

module.exports = router;
