import User from './user.model.js';
import { hash, verify } from 'argon2';

export const createUser = async (req, res) => {
    try {
        const data = req.body;

        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        data.password = await hash(data.password);

        const newUser = new User(data);
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }

        });
    }catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: err.message
        });
    }
}