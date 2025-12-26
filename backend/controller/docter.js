import express from "express";
import Docter from "../model/docterModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const secretkey=process.env.SECRET_KEY;

export const d_login = async (req, res) => {
    try {
        const { docter_id, password } = req.body;
        if (!docter_id || !password) {
            return res.status(400).json({ message: "Username and password required" });
        }   
        const data = await Docter.findOne({ docter_id: docter_id });
        if (!data) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, data.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ user_id: data._id }, secretkey, { expiresIn: "1h" });
        res.json({ token, message:"logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const d_signup = async (req, res) => {
    try {
        const { docter_id, password, name, specialization, hospital } = req.body;
        if (!docter_id || !password || !name || !specialization || !hospital) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await Docter.findOne({ docter_id: docter_id });
        if (existingUser) {
            return res.status(400).json({ message: "Doctor already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDocter = new Docter({ 
            docter_id, 
            password: hashedPassword, 
            name,
            specialization,
            hospital
        });
        await newDocter.save();
        res.status(201).json({ message: "Doctor registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getdocterprofile = async(req,res)=>{
    try {
        const user_id = req.user_id;
        const user = await Docter.findById (user_id) ;
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({data:user});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const updateprofile = async(req,res)=>{
    try {
        const user_id = req.user_id;
        const user = await Docter.findById (user_id) ;
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const {name,specialization,hospital} = req.body;
        user.name = name;
        user.specialization = specialization;
        user.hospital = hospital;
        await user.save();
        return res.status(200).json({message:"Profile updated successfully",data:user});        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export default { d_login, d_signup,getdocterprofile,updateprofile};