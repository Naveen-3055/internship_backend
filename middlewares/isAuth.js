import jwt from "jsonwebtoken"
export const isAuth = async (req,res,next)=>{
    try {
        const token = req.cookies.token
         if(!token){
        return res.status(401).json({message:`token is not found`});
        }

        let verifyToken = await jwt.verify(token,process.env.JWT_SECRET)
    //console.log(verifyToken);
        req.userId = verifyToken.userId
        next()
    } catch (error) {
        return res.status(500).json({message:`isAuth error ${error.message}`})
    }
}