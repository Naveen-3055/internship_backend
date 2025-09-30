
import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { getProfile, updateProfile } from '../controllers/user.controller.js'

const profileRouter = express.Router()

profileRouter.get("/",isAuth,getProfile)
profileRouter.put("/update",isAuth,updateProfile)

export default profileRouter