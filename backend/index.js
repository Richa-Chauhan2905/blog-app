import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/user.route.js";
import fileUpload from "express-fileupload";

const app = express();
dotenv.config();

const port = process.env.PORT;
const MONOGO_URL = process.env.MONGODB_URI;

//middleware
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}))

// DB Code
try {
  mongoose.connect(MONOGO_URL);
  console.log("Conntected to MonogDB");
} catch (error) {
  console.log("Couldn't connect to DB", error);
}

// defining routes
app.use("/api/users", router);

//Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});