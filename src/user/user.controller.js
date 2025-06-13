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

export const getUsers = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query;

        const query = { status: true };

        const [users, total] = await Promise.all([
            User.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .select('-password -__v'),
            User.countDocuments(query)
        ]);

        return res.status(200).json({
            success: true,
            total,
            users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: err.message
        });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { uid } = req.params;

        const user = await User.findById(uid).select('-password -__v');
        if (!user || !user.status) {
            return res.status(404).json({
                success: false,
                message: 'User not found or inactive'
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: err.message
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const { password, dpi, ...dataN } = req.body;

        let user = await User.findById(uid);
        if (!user || !user.status) {
            return res.status(404).json({
                success: false,
                message: 'User not found or inactive'
            });
        }

        user = await User.findByIdAndUpdate(uid, dataN, { new: true })
        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: err.message
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found or inactive'
            });
        }

        user = await User.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: 'User deactivated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error deactivating user',
            error: err.message
        });
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { usuario } = req
        const { currentPassword } = req.body
        const { newPassword } = req.body

        const oldPassword = await verify(usuario.password, currentPassword)


        if(!oldPassword){
            return res.status(400).json({
                success: false,
                msg: "Old password does not match"
            })
        }

        const user = await User.findById(usuario._id)

        const matchOldAndNewPassword = await verify(user.password, newPassword)

        if(matchOldAndNewPassword){
            return res.status(400).json({
                success: false,
                msg: "The new password cannot be the same as the previous one"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(usuario._id, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            msg: "Updated password",
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error updating password',
            error: err.message
        });
    }
}

export const updateMe = async (req, res) => {
    try {
        const { usuario } = req;
        const { password, dpi, ...dataN } = req.body;

        const userFound = await User.findById(usuario._id);
        if (!userFound || !userFound.status) {
            return res.status(404).json({
                success: false,
                msg: "User not found or inactive"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(usuario._id, dataN, { new: true });

        return res.status(200).json({
            success: true,
            msg: "User updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Error updating user",
            error: err.message
        });
    }
};
