const express = require("express");
const router = express.Router();
const upload = require("./middleware/upload");
const authAdmin = require("./middleware/authAdmin");
const authClient = require("./middleware/authClient");
const authEmployee = require("./middleware/authEmployee");
const HomeController = require("./controllers/HomeController");
const AdminController = require("./controllers/AdminController");
const AuthAdminController = require("./auth/AuthAdminController");
const AuthClientController = require("./auth/AuthClientController");
const ProductController = require("./controllers/ProductController");
const UserController = require("./controllers/UserController");
const OrderController = require("./controllers/OrderController");
const ForgotPasswordController = require("./auth/ForgotPasswordController");
const ReviewsController = require("./controllers/ReviewsController");
const CategoryController = require("./controllers/CategoryController");

router.post("/auth/admin", AuthAdminController.login);
router.post("/auth/client", AuthClientController.login);
router.post("/forgot_password", ForgotPasswordController.forgot);
router.post("/reset_password", ForgotPasswordController.reset);

router.get("/", HomeController.index);

router.get("/admins", authAdmin, AdminController.findAll);
router.get("/admins/:id", authAdmin, AdminController.findById);
router.post("/admins", authAdmin, AdminController.insert);
router.put("/admins/:id", authAdmin, AdminController.update);
router.delete("/admins/:id", authAdmin, AdminController.delete);

router.get("/products", ProductController.findAll);
router.get("/products/:id", ProductController.findById);
// prettier-ignore
router.post("/products", [authEmployee, upload.single("path")], ProductController.insert);
// prettier-ignore
router.patch("/products/:id", [authEmployee, upload.single("path")], ProductController.update);
router.delete("/products/:id", authEmployee, ProductController.delete);

router.get("/users", UserController.findAll);
router.get("/users/:id", UserController.findById);
router.post("/users", UserController.insert);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", authEmployee, UserController.delete);

router.get("/orders", OrderController.index);
router.post("/orders", authClient, OrderController.newOrder);
router.delete("/orders/:id", OrderController.remove);

router.get("/reviews", ReviewsController.index);
router.post("/reviews", ReviewsController.newReviews);

router.get("/categories", CategoryController.index);
router.get("/categories/:id", CategoryController.getCategoryById);
router.post("/categories", CategoryController.newCategory);
router.put("/categories/:id", CategoryController.edit);
router.delete("/categories/:id", CategoryController.remove);

module.exports = router;
