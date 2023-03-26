const { Router } = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

// this fires the functions inside controllers/authController
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

router.get("/authRequest", authMiddleware.checkAuth);
router.get("/authLogout", authMiddleware.logout);

module.exports = router;
