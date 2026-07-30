import {body} from "express-validator"

export const createProductValidation = [
    body('pname').isLength({min: 1}).withMessage("Cannot not be null"),
    body('price').isLength({min: 1}).withMessage("Should be greater than 0"),
    body('model').isLength({min: 4}).withMessage("Should be valid year"),
]

export const updateProductValidation = [
    body('pname').isLength({min: 1}).withMessage("Cannot not be null"),
    body('price').isLength({min: 1}).withMessage("Should be greater than 0"),
    body('model').isLength({min: 4}).withMessage("Should be valid year"),
]