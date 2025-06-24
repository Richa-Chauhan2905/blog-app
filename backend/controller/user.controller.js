import { User } from "../models/user.model.js"

export const register = async (req, res) => {
    const { email, name, password, phone, education, role } = req.body

    if (
        [email, name, password, phone, education, role].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({ email })
    if (user) {
        res
            .status(400)
            .json({
                message: "User already exists"
            })
    }

    const newUser = new User({
        email,
        name,
        password,
        phone,
        education,
        role
    })
    await newUser.save()

    if (newUser) {
        res
            .status(200)
            .json({
                message: "User registered successfully"
            })
    }
}