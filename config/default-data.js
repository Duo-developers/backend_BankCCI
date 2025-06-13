import { hash } from "argon2";
import User from "../src/user/user.model.js";

const defaultData = async () => {
    try {
        const admin = await User.findOne({ role: "ADMIN_ROLE" });

        if(!admin) {
            const email = "admin@gmail.com";
            const password = "ADMINB";
            const username = "ADMINB";

            const hashedPassword = await hash(password)

            const newAdmin = new User({
                username,
                password: hashedPassword,
                role: "ADMIN_ROLE",
                name: "Admin",
                dpi: "1234567890123",
                address: "123 Admin St",
                phone: "1234567890",
                email,
                workName: "Admin Work",
                monthlyIncome: 0 
            });

            await newAdmin.save();

            console.log("Default admin user created successfully.");
        }else {
            console.log("Admin user already exists.");
        } 
    }   catch (err) {
        return console.error("Error creating default admin user:", err);
    }
}

export default defaultData;