import mongoose from "mongoose";
import Blog from "../models/blog.model.js"
import { v2 as cloudinary } from "cloudinary";

export const createBlog = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "Blog image is required" });
        }
        const { blogImage } = req.files;
        const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedFormats.includes(blogImage.mimetype)) {
            return res.status(400).json({
                message: "Invalid photo format. Only jpg and png are allowed",
            });
        }
        const { title, category, about } = req.body;
        if (
            !title ||
            !category ||
            !about
        ) {
            return res.status(400).json({ message: "Please fill required fields" });
        }

        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo?.url;
        const createdBy = req?.user?._id

        const cloudinaryResponse = await cloudinary.uploader.upload(
            blogImage.tempFilePath
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error);
        }

        const blogData = {
            title,
            about,
            category,
            adminName,
            adminPhoto,
            createdBy,
            blogImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url
            }
        }

        const blog = await Blog.create(blogData)

        return res
            .status(200)
            .json({
                message: "Blog created", blog
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server error" });
    }
};

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
        return res
            .status(400)
            .json({
                message: "Blog not found"
            })
    }

    await blog.deleteOne();
    res
        .status(200)
        .json({
            message: "Blog deleted"
        })
}

export const getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await Blog.find();

        if (allBlogs.length === 0) {
            return res.status(404).json({ message: "Blog not found getBlog" });
        }
        console.log("Blogs fetched")
        return res.status(200).json(allBlogs);

    } catch (error) {
        console.log("Error in fetching blogs", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    message: "Invalid Blog id"
                })
        }

        if (!blog) {
            return res
                .status(404)
                .json({
                    message: "Blog not found"
                })
        }

        res.status(200).json(blog)
    } catch (error) {
        return res
            .status(400)
            .json({
                message: "Internal server error",
                error: error
            })
    }
}

export const myBlogs = async (req, res) => {
    try {
        const createdBy = req.user._id;
        const myBlogs = await Blog.find({ createdBy })
        return res
            .status(200)
            .json(myBlogs)
    } catch (error) {
        return res
            .status(400)
            .json({
                message: "Internal server error",
                error: error
            })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    message: "Invalid blog id",
                })
        }
        const updateBlog = await Blog.findById(id, req.body, { new: true });
        if (!updateBlog) {
            return res
                .status(404)
                .json({
                    message: "Blog not found",
                })
        }

        res.status(200).json({
            message: "Blog Updated :)",
            updateBlog
        })
    } catch (error) {
        return res
            .status(400)
            .json({
                message: "Internal server error",
                error: error
            })
    }
}