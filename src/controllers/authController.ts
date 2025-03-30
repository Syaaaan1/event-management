import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models/User';

export const registerUser = async(req : Request, res : Response) => {
    try{
        const {username, email, password} = req.body;

        const userExists = await User.findOne({ where : {email} });
        if(userExists){
            return res.status(400).json({message : "User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({username, email, password : hashedPassword});
    }catch(error : any){
        res.status(500).json({message : error.message});
    }
};

export const loginUser = async (req : Request, res : Response) => {
    try{
        const { email, password } = req.body;
        
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        //jwt
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return res.json({ token });
    }catch(error : any){
        res.status(500).json({ message: error.message });
    }
}