import { Router } from 'express';
import { createUserValidator, getUsersValidator, getUserByIdValidator, deleteUserValidator, updateUserValidator, updatePasswordValidator, getUserLoggedValidator } from '../middlewares/user-validator.js';
import { createUser, getUsers, getUserById, deleteUser, updateUser, updateMe, updatePassword, getUserLogged } from './user.controller.js';

const router = Router();

router.post('/', createUserValidator, createUser);
router.get('/', getUsersValidator, getUsers);
router.put('/me', updateUserValidator, updateMe);
router.patch('/password', updatePasswordValidator,updatePassword);
router.get('/:uid', getUserByIdValidator, getUserById);
router.put('/:uid', updateUserValidator, updateUser);
router.delete('/:uid', deleteUserValidator, deleteUser);
router.get('/me', getUserLoggedValidator, getUserLogged);


export default router;