import Account from '../account/account.model.js';

export const generateAccountNumber = async () => {
    const accounts = await Account.find().sort({ createdAt: -1 }).limit(1);
    let accountNumber = '0000000000';

    if (accounts.length > 0) {
        const lastAccount = accounts[0];
        const lastAccountNumber = lastAccount.accountNumber || '0000000000';
        const nextAccountNumber = parseInt(lastAccountNumber, 10) + 1;
        accountNumber = nextAccountNumber.toString().padStart(10, '0');
    }

    return accountNumber;
}