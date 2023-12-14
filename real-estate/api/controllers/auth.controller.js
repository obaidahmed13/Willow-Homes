import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

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
}

