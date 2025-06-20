import { Router } from 'express';
import {
    getAccounts,
    registerAccount,
    deleteAccount
} from './account.controller.js';
import {
    registerAccountValidator,
    deleteAccountValidator,
    getAccountsValidator
} from '../middlewares/account-validator.js';

const router = Router();

router.get('/getAccounts', getAccountsValidator, getAccounts);

router.post('/createAccount', registerAccountValidator, registerAccount);


router.delete('/delteAccount/:id', deleteAccountValidator, deleteAccount);

export default router;