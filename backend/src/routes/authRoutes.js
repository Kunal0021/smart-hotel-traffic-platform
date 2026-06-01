const express = require("express");

const router = express.Router();

const {
    register,
    login,
} = require("../controllers/authController");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login);

module.exports = router;