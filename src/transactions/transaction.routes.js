import { Router } from "express";
import {
    listAccountsByTransactionCount,
    makeDeposit,
    modifyDepositAmount,
    revertDeposit,
    getAccountSummary,
    makeTransfer
} from "./transaction.controller.js";
import {
    makeDepositValidator,
    modifyDepositAmountValidator,
    revertDepositValidator,
    makeTransferValidator,
    getAccountSummaryValidator,
    listAccountsByTransactionCountValidator
} from "../middlewares/transaction-validator.js";

const router = Router();

router.get("/accounts-by-transaction-count", listAccountsByTransactionCountValidator, listAccountsByTransactionCount );

router.post( "/deposit", makeDepositValidator,makeDeposit );

router.put("/deposit/modify",modifyDepositAmountValidator,modifyDepositAmount);

router.post("/deposit/revert",revertDepositValidator,revertDeposit);

router.get("/summary/:accountId",getAccountSummaryValidator,getAccountSummary);

router.post("/transfer",makeTransferValidator,makeTransfer);

export default router;
