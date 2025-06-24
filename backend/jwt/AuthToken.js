import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const createTokenAndSaveCookies = async (userId, res) => {
    const token = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'})

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })

    await User.findByIdAndUpdate(userId, {token})
    return token
}

