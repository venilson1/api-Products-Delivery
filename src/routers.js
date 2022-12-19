const express = require("express");
const router = express.Router();
const upload = require("./middleware/upload");
const authAdmin = require("./middleware/authAdmin");
const authClient = require("./middleware/authClient");
const authEmployee = require("./middleware/authEmployee");
const HomeController = require("./modules/HomeController");
const AdminController = require("./modules/Admin/AdminController");
const AuthAdminController = require("./modules/Auth/AuthAdminController");
const AuthClientController = require("./modules/Auth/AuthClientController");
const ProductController = require("./modules/Product/ProductController");
const UserController = require("./modules/User/UserController");
const OrderController = require("./modules/Order/OrderController");
const ForgotPasswordController = require("./modules/Auth/ForgotPasswordController");
const ReviewController = require("./modules/Product/Review/ReviewController");
const CategoryController = require("./modules/Category/CategoryController");

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
router.get("/products/:id/reviews", ProductController.findByIdAndReviews);

router.get("/users", UserController.findAll);
router.get("/users/:id", UserController.findById);
router.post("/users", UserController.insert);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", authEmployee, UserController.delete);

router.get("/orders", OrderController.index);
router.post("/orders", authClient, OrderController.newOrder);
router.delete("/orders/:id", OrderController.remove);

router.get("/reviews", ReviewController.findAll);
router.post("/reviews", ReviewController.insert);

router.get("/categories", CategoryController.findAll);
router.get("/categories/:id", CategoryController.findById);
router.post("/categories", CategoryController.insert);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);

module.exports = router;
