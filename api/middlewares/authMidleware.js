import createError from "../controllers/errorController.js";
import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    // check token
    if(!token){
        return next(createError(401, "user not authenticated"))
    }
    // IF LOGGED IN
    const logged_user = jwt.verify(token, process.env.JWT_SECRET)
    if(!logged_user){
        return next(createError(401, "token not verified"))
    }
    if(logged_user){
        req.user = logged_user
        next()
    }
  } catch (error) {
    next(error)
  }
}