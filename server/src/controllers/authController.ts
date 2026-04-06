import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcrypt'
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exist' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({ message: "User Created", user });

    } catch (error) {
        console.log("Error in register controller", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const secretkey = process.env.SECRET_KEY;

        if (!secretkey) throw new Error("SECRET KEY is missing");

        //check user 
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }

        // check password

        if (!user.password) {
            return res.status(400).json({ message: "Invalid user data" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "INVALID CREDIENTIALS" });
        }

        //create Token
        const token = jwt.sign({ id: user._id, role: user.role },
            secretkey,
            { expiresIn: '1d' }
        )

        console.log("login is done ");

        res.json({ message: "Login Success", token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server Error" })
    }
};