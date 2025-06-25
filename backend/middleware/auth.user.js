import { User } from '../models/user.model.js'
import jwt from 'jsonwebtoken'

//authentication
export const isAuthenticated = async (req, res, next) => {

    try {
        const token = await req.cookies.jwt
        console.log("cookie token: ", token)

        if (!token) {
            return res
                .status(401)
                .json({
                    message: "User not authenticated", token
                })
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded.userId)

        if (!user) {
            return res
                .status(404)
                .json({
                    message: "User not found", token
                })
        }

        req.user = user

        next();

    } catch (error) {
        console.log("Error in authentication", error);
        return res
            .status(401)
            .json({
                error: "User not authenticated"
            })
    }
}

//authorization

export const isAdmin = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res
            .status(403)
            .json({
                error: `User with given role ${req.user.role} not allowed`
            })
        }
        next();
    }
}

