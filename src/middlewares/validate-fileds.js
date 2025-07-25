import { validationResult } from "express-validator";

export const validateField = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
    }
    next()
}