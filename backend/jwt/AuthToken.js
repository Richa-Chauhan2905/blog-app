import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

const createTokenAndSaveCookies = async (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30d' })

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        })

        await User.findByIdAndUpdate(userId, { token })
        return token

    } catch (error) {
        return res
            .status(500)
            .json({
                error: "Internal Server error"
            })
    }
}

export default createTokenAndSaveCookies
