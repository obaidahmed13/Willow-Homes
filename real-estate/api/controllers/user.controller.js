import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
    res.json({
        message: "Api route works",
    });
}

export const updateUser = async (req, res, next) => {
    // params id from the route, user.id from jwt verifyUser
    if (req.user.id != req.params.id) return next(errorHandler(401, "You can only update your own account"))
    try {
        // If a new password is provided in req body, add a salt and hash it
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        // Find user collection by route id and update using data from body
        const updatedUser=  await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            }
        }, {new: true})
        // Return updatedUser data without the password saved in rest object
        const{password, ...rest} = updatedUser._doc;
        // Respond with updated user information
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if(req.user.id!=req.params.id) return next(errorHandler(401, "You can only delete your account"))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted')
    } catch (error) {
        next(error)
    }
}