
import generateToken from "../config/token.js"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import logger from "../config/logger.js";
export const signUp = async (req,res)=>{
    try {
        const {userName,email,password} = req.body;
        logger.info(`Signup attempt with email: ${email}`);
        const checkByUsername = await User.findOne({userName})
        if(checkByUsername){
            logger.warn(`Signup failed: username ${userName} already exists`);
            return res.status(400).json({Message:`"username already exist"`})
        }

        const checkByEmail = await User.findOne({email})
        if(checkByEmail){
             logger.warn(`Signup failed: username ${userName} already exists`);
           return  res.status(400).json({Message:`"email already exist"`})
        }
        if(password.length<6){
            logger.warn(`Signup failed: password too short for ${email}`);
           return  res.status(400).json({Message:`"password should contains more than 6 characters`})
        }

        const hashpassword = await bcrypt.hash(password,10)

        const user = await User.create({
            userName,email,password:hashpassword
        })

        const token = await generateToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"Strict",
            secure:false
            })
         logger.info(`Signup successful: ${email}`);
            return res.status(201).json(user);

    } catch (error) {
        logger.error(`Signup error: ${error.message}`, { stack: error.stack });
        return res.status(500).json({message:`signUp error ${error.message}`});
    }
}

export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
         logger.info(`Login attempt: ${email}`);
        const user = await User.findOne({email})
        if(!user){
             logger.warn(`Login failed: User not found for ${email}`);
            return res.status(400).json({Message:"user not exists"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
             logger.warn(`Login failed: Wrong password for ${email}`);
             return res.status(400).json({message:`incorrect password`});
        }
         const token = await generateToken(user._id);

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"Strict",
            secure:false
        })
         logger.info(`Login successful: ${email}`);
        return res.status(200).json(user);

    } catch (error) {
         return res.status(500).json({message:`login error ${error}`})
    }
}

export const logout = async (req,res)=>{
     try {
            res.clearCookie("token");
            logger.info("User logged out");
            res.status(200).json({message:`logout succesfully...`})
        } catch (error) {
            return res.status(500).json({message:`login error ${error}`})
        }
}