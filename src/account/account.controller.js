import Account from './account.model.js';
import { generateAccountNumber } from '../helpers/generate-account-number.js';

export const getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({ status: true }).populate('user', 'name email');
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las cuentas', error });
    }
}

export const registerAccount = async (req, res) => {
    const data = req.body;
    try {
        data.accountNumber = await generateAccountNumber();
        const newAccount = new Account(data);
        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la cuenta', error });
    }
}

export const updateAccount = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedAccount = await Account.findByIdAndUpdate(id, data, { new: true });
        if (!updatedAccount) {
            return res.status(404).json({ message: 'No se encontro la cuenta', error: id });
        }
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la cuenta', error });
    }
}

export const deleteAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAccount = await Account.findByIdAndUpdate(id, { status: false }, { new: true });
        if (!deletedAccount) {
            return res.status(404).json({ message: 'No se encontro la cuenta', error: id });
        }
        res.status(200).json(deletedAccount);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la cuenta', error });
    }
}