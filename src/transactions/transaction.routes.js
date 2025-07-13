import { Router } from "express";
import {
    listAccountsByTransactionCount,
    makeDeposit,
    modifyDepositAmount,
    revertDeposit,
    getAccountSummary,
    makeTransfer,
    buyProduct 
} from "./transaction.controller.js";
import {
    makeDepositValidator,
    modifyDepositAmountValidator,
    revertDepositValidator,
    makeTransferValidator,
    getAccountSummaryValidator,
    listAccountsByTransactionCountValidator,
    buyProductValidator 
} from "../middlewares/transaction-validator.js";

const router = Router();

router.get("/accounts-by-transaction-count", listAccountsByTransactionCountValidator, listAccountsByTransactionCount );

router.post( "/deposit", makeDepositValidator,makeDeposit );

router.put("/deposit/modify",modifyDepositAmountValidator,modifyDepositAmount);

router.post("/deposit/revert",revertDepositValidator,revertDeposit);

router.get("/summary/:accountId",getAccountSummaryValidator,getAccountSummary);

router.post("/transfer",makeTransferValidator,makeTransfer);

router.post("/purchase", buyProductValidator, buyProduct);


export default router;
