import { Router } from 'express';
import { createUserValidator, getUsersValidator, getUserByIdValidator, deleteUserValidator, updateUserValidator, updatePasswordValidator } from '../middlewares/user-validator.js';
import { createUser, getUsers, getUserById, deleteUser, updateUser, updateMe, updatePassword } from './user.controller.js';

const router = Router();

router.post('/', createUserValidator, createUser);
router.get('/', getUsersValidator, getUsers);
router.get('/:uid', getUserByIdValidator, getUserById);
router.put('/:uid', updateUserValidator, updateUser);
router.put('/me', updateUserValidator, updateMe);
router.patch('/password', updatePasswordValidator,updatePassword);
router.delete('/:uid', deleteUserValidator, deleteUser);

export default router;