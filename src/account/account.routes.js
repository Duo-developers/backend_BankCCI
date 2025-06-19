import { Router } from 'express';
import {
    getAccounts,
    registerAccount,
    updateAccount,
    deleteAccount
} from './account.controller.js';
import {
    registerAccountValidator,
    updateAccountValidator,
    deleteAccountValidator
} from '../middlewares/account-validator.js';

const router = Router();

router.get('/getAccounts', getAccounts);

router.post('/createAccount', registerAccountValidator, registerAccount);

router.put('/updateAccount', updateAccountValidator, updateAccount);

router.delete('/delteAccount', deleteAccountValidator, deleteAccount);

export default router;