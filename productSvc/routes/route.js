import express from "express";
import { createProductValidation, updateProductValidation } from "../lib/validation.js";
import { validate } from "../lib/validate.js";
import {authorizeSeller} from "../middleware/authorizeSeller.js"
import { handleCreation, handleRead, handleUpdation, handleDeletion, getUserProducts } from "../controller/controller.js";

const productRoute = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     ProductInput:
 *       type: object
 *       required:
 *         - pname
 *         - price
 *         - model
 *         - user
 *       properties:
 *         pname:
 *           type: string
 *           example: Wireless Mouse
 *         description:
 *           type: string
 *           example: Ergonomic optical wireless mouse
 *         price:
 *           type: number
 *           example: 29.99
 *         model:
 *           type: number
 *           example: 2024
 *         user:
 *           type: string
 *           description: MongoDB ObjectId of the user
 *           example: 60d5ecb8b5c9c22b4c8b4567
 *
 *     ProductResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 660f1b2c4e3f8a0012a45678
 *         pname:
 *           type: string
 *           example: Wireless Mouse
 *         description:
 *           type: string
 *           example: Ergonomic optical wireless mouse
 *         price:
 *           type: number
 *           example: 29.99
 *         model:
 *           type: number
 *           example: 2024
 *         user:
 *           type: string
 *           example: 60d5ecb8b5c9c22b4c8b4567
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /api/createProd:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Validation or request error
 */
productRoute.post("/createProd", authorizeSeller(),handleCreation);

/**
 * @openapi
 * /api/getProd:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *       500:
 *         description: Internal server error
 */
productRoute.get("/getProd", handleRead);

/**
 * @openapi
 * /api/getUserProd:
 *   get:
 *     summary: Get all products of particular user
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *       500:
 *         description: Internal server error
 */
productRoute.get("/getUserProd", authorizeSeller(), getUserProducts);

/**
 * @openapi
 * /api/updateProd/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB ObjectId of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Product not found
 */
productRoute.put("/updateProd/:id", updateProductValidation, validate, authorizeSeller(), handleUpdation);

/**
 * @openapi
 * /api/delProd/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB ObjectId of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
productRoute.delete("/delProd/:id", authorizeSeller(), handleDeletion);

export default productRoute;