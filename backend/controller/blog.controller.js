import Blog from "../models/blog.model.js"
import { v2 as cloudinary } from "cloudinary";

export const createBlog = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "Blog image is required" });
        }
        const { blogImage } = req.files;
        const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedFormats.includes(photo.mimetype)) {
            return res.status(400).json({
                message: "Invalid photo format. Only jpg and png are allowed",
            });
        }
        const { title, category,about } = req.body;
        if (
            !title ||
            !category ||
            !about 
        ) {
            return res.status(400).json({ message: "Please fill required fields" });
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(
            photo.tempFilePath
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error);
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            phone,
            education,
            role,
            photo: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url
            }
        })
        await newUser.save()

        if (newUser) {
            const token = await createTokenAndSaveCookies(newUser._id, res)

            return res
                .status(200)
                .json({
                    message: "User registered successfully", newUser, token: token
                })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server error" });
    }
};