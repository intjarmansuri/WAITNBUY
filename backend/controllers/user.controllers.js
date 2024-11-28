import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "3d" }
  );
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  if (password.length < 5) {
    throw new ApiError(400, "Password must be at least 5 characters long");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "Email already exits");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, user, "You are registered now!"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email and password");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user crendentials");
  }

  const loggedInUser = await User.findById(user._id).select("-password");

  const accessToken = generateAccessToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, { loggedInUser, accessToken }, "You're login now!")
    );
});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Check if provided credentials match the admin credentials
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Create JWT token
    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    // Respond with the token
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(200, { accessToken }, "Admin logged in successfully!")
      );
  } else {
    throw new ApiError(401, "Invalid admin credentials");
  }
});

export { registerUser, loginUser, adminLogin };
