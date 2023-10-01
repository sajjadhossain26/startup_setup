import User from '../models/User.js'
import createError from '../utility/createError.js'
import { hashPassword, passwordVerify } from '../utility/hash.js';
import { sendActivationLink } from '../utility/sendMail.js';
import { createToken } from '../utility/token.js';
import { isEmail } from '../utility/valiDate.js';


/**
 * @access public
 * @method GET
 * @route api/user
 */


export const login =async (req, res, next) => {
  try {
    const {email, password} = req.body;

    // validation
    if(!email || !password ){
       
      next(createError(400, "All Fields are required!"))
    }
    if(!isEmail(email)){
      next(createError(400, "Invalid Email Address!"))
    }
    const loggedinUser = await User.findOne({email: email});
    if(!loggedinUser){
      next(createError(400, "User not found!"));
    }else{
      if(!passwordVerify(password, loggedinUser.password)){
        next(createError(400, "Password not match"))
      }else{
   
        const token = createToken ({id: loggedinUser._id}, '365d')
        res.status(200).cookie('auth_token', token).json({
          message: 'User login successfull!',
          user: loggedinUser,
          token: token
        })
      }
      
    }

  } catch (error) {
    next(error)
  }
}



/**
 * @access public
 * @method GET
 * @route api/user
 */


export const register =async (req, res, next) => {
  try {
    const {first_name, sur_name, email, password, birth_date, birth_month, birth_year, gender} = req.body;

    // validation
    if(!first_name || !sur_name || !email || !password || !gender ){
      next(createError(404, "All Fields are required!"))
    }

    if(!isEmail(email)){
      next(createError(400, "Invalid Email Address!"))
    }

    const emailUser = await User.findOne({email: email});
    if(emailUser){
      next(createError(400, "Email already exist"));
    }

    const user = await User.create({
      first_name, sur_name, email, password: hashPassword(password), birth_date, birth_month, birth_year, gender
    })

 

    if(user){
    const token = createToken ({id: user._id}, '365d')
    const activationToken = createToken({id: user._id}, '30d')
 
    sendActivationLink(user.email, {
      name: user.first_name,
      link:`${process.env.APP_URL +':'+ process.env.PORT }/activate/${activationToken}`
    })
    
      res.status(200).json({
        message: 'Registration successfull!',
        user: user,
        token: token
      })
    }
  } catch (error) {
     next(error)
  }
}




/**
 * @access public
 * @method GET
 * @route api/user
 */


export const loggedInUser =async (req, res, next) => {
  res.send('Logged user is ok')
}