import { body } from "express-validator";

export const signInValidation = [
    body('email').isEmail().withMessage("Must be a valid email"),
    body('password').isLength({min: 8}).withMessage("Password must be at least 8 characters long")
];

export const signUpValidation = [
    body('username').isLength({min: 1}).withMessage("Must have at leat 1 character"),
    body('email').isEmail().withMessage("Must be a valid email"),
    body('password').isLength({min: 8}).withMessage("Password must be at least 8 characters long")
]