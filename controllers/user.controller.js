import User from "../models/user.model.js";

export const getProfile = async (req,res)=>{
    try{
        let userId = req.userId
        const user = await User.findById(userId).select("-password")
        if(!user){
            res.status(400).json({Message:`user doesnt exists`});
        }
        return res.status(200).json(user)
    }catch(error){
        res.status(500).json({Message:` ${error}`})
    }
}

export const updateProfile = async (req,res)=>{
    try {
        const {userName, email} = req.body
   
    let user = await User.findByIdAndUpdate(req.userId,{$set: {userName,email}},{new:true})
    if(!user){
        res.status(400).json({Message:`Name required`})
    } 
    return res.status(200).json({Message:"success", user:{
        id: user._id,
        userName : user.userName,
        email : user.email
    }}); 
    } catch (error) {
         return res.status(500).json({message:`current user error ${error}`}); 
    }


}