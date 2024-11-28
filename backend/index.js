import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

dotenv.config({ path: "./.env" });

connectDB();
connectCloudinary();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
