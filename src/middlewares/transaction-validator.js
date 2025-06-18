import { body, param, query } from "express-validator";
import { validateField } from "./validate-fileds.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const listAccountsByTransactionCountValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    query("order").optional().isIn(["asc", "desc"]).withMessage("Order must be 'asc' or 'desc'"),
    validateField,
    handleErrors
];

export const makeDepositValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("toAccountId").notEmpty().withMessage("Destination account is required").isMongoId().withMessage("Invalid account ID"),
    body("amount").notEmpty().withMessage("Amount is required").isFloat({ gt: 0 }).withMessage("Amount must be greater than 0"),
    validateField,
    handleErrors
];

export const modifyDepositAmountValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("transactionId").notEmpty().withMessage("Transaction ID is required").isMongoId().withMessage("Invalid transaction ID"),
    body("newAmount").notEmpty().withMessage("New amount is required").isFloat({ gt: 0 }).withMessage("Amount must be greater than 0"),
    validateField,
    handleErrors
];

export const revertDepositValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("transactionId").notEmpty().withMessage("Transaction ID is required").isMongoId().withMessage("Invalid transaction ID"),
    validateField,
    handleErrors
];

export const getAccountSummaryValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    param("accountId").notEmpty().withMessage("Account ID is required").isMongoId().withMessage("Invalid account ID"),
    validateField,
    handleErrors
];

export const makeTransferValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    body("fromAccountId").notEmpty().withMessage("Sender account is required").isMongoId().withMessage("Invalid account ID"),
    body("toAccountId").notEmpty().withMessage("Destination account is required").isMongoId().withMessage("Invalid account ID"),
    body("amount").notEmpty().withMessage("Amount is required").isFloat({ gt: 0 }).withMessage("Amount must be greater than 0"),
    validateField,
    handleErrors
];
