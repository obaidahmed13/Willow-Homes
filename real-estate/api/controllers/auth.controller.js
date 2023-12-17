import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
// Authenticating form data 

// Signup asynchronous function taking request (req) and response (res) parameters
export const signup = async(req, res, next) => {

    // Extract username, email, and password from the request body
    const{username, email, password} = req.body;

    // Hashed password, added salt, using bcrypt
    const hashedPassword = bcryptjs.hashSync(password,10);

    // Create a new User instance with the hashed password
    const newUser = new User({username, email, password: hashedPassword});
    try {
        // Attempt to save the new user to the database
        await newUser.save();
        
        // If successful, send a 201 status (resource created) and a success message
        res.status(201).json("User created successfully");
        
    } catch (error) {

        // If an error occurs during the database operation, send a 500 status (internal server error) and the error message
        next(error);
        
    }
};

export const signin = async (req, res, next) => {
    // Requesting email , passworf from body
    const {email, password} = req.body;
    
    try {
        // Create validUser variable with the user email entered
        const validUser = await User.findOne({email});
        if (!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'Wrong Credentials!'));
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const {password:pass, ...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest);
    } catch (error) {
        next(error)
        
    }
};


export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out')
    } catch (error) {
        next(error)
    }
};