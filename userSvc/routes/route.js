import express from "express"
import { signInValidation, signUpValidation } from "../lib/validation.js";
import {validate} from "../lib/validate.js"
import { userSignIn, userSignOut, userSignUp } from "../controllers/controller.js";

const userRoute = express.Router();

/**
 * @openapi
 * /api/user/sign-in:
 *   post:
 *     summary: sign-in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123!
 *     responses:
 *       200:
 *         description: Success
 */
userRoute.post("/sign-in", signInValidation, validate, userSignIn);

/**
 * @openapi
 * /api/user/sign-up:
 *   post:
 *     summary: sign-up a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: user
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123!
 *               role:
 *                 type: string
 *                 example: 'buyer' or 'seller'
 *     responses:
 *       200:
 *         description: Success
 */
userRoute.post("/sign-up", signUpValidation, validate, userSignUp);

/**
 * @openapi
 * /api/user/sign-out:
 *   get:
 *     summary: sign-out a user
 *     responses:
 *       200:
 *         description: Success
*/
userRoute.get("/sign-out", userSignOut);

export default userRoute; 