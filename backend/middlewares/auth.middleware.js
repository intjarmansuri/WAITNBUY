import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log("Token in Request:", token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request!");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("Decoded Token:", decodedToken);

    // console.log("Decoed ID", decodedToken.id);

    const user = await User.findById(decodedToken?.id).select("-password");
    // console.log("User Retrieved:", user);

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const adminAuth = asyncHandler(async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // If no token, throw error
    if (!token) {
      throw new ApiError(401, "Unauthorized request!");
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Check admin email
    if (decodedToken.email !== process.env.ADMIN_EMAIL) {
      throw new ApiError(403, "Unauthorized request!");
    }

    req.user = decodedToken; // Attach user info
    next(); // Proceed to next middleware
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
