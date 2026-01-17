import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function signup( req, res) {
const {email, password,fullName, role} =req.body;

try {

    if(!email || !password || !fullName){
        return res.status(400).json({message: "All fields are required"});
    }
    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters"});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Invalid email format" });
}
    const exisitingUser = await User.findOne({email});
    if(exisitingUser){
        return res.status(400).json({message: "Emails already exists,please use a different one"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar =`https://avatar.iran.liara.run/public/boy/${idx}.png`;
    const newUser = await User.create(
        {
            email,
            password: hashedPassword,
            fullName,
            role: role || 'agent',
            profilePic: randomAvatar,
        }
    )
    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY,
         {expiresIn: "7d"});
    
    res.cookie("jwt", token, {
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV === "production"
    })
    
    res.status(201).json({sucess:true,newUser:{
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        profilePic: newUser.profilePic
    }});
} catch (error) {
    console.error("Error in signup controller", error);
    res.status(500).json({message: "Internal Server Error"});
}
}

export async function login( req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export function logout( req, res) {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export function checkAuth(req, res) {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
