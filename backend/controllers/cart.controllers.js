import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Add products to user cart
const addToCart = asyncHandler(async (req, res) => {
  const { itemId, size } = req.body;

  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.cartData[itemId]) {
    if (user.cartData[itemId][size]) {
      user.cartData[itemId][size] += 1;
    } else {
      user.cartData[itemId][size] = 1;
    }
  } else {
    user.cartData[itemId] = { [size]: 1 };
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { cartData: user.cartData } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { updatedUser }, "Item added in the cart"));
});

// Update user cart
const updateCart = asyncHandler(async (req, res) => {
  const { itemId, size, quantity } = req.body;

  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  let cartData = await user.cartData;

  cartData[itemId][size] = quantity;

  await User.findByIdAndUpdate(userId, { cartData }, { new: true });

  return res
    .status(200)
    .json(new ApiResponse(200, { cartData }, "Cart updated successfully!"));
});

// Get user card data
const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  let cartData = await user.cartData;

  return res
    .status(200)
    .json(new ApiResponse(200, { cartData }, "Cart retrieved successfully"));
});

export { addToCart, updateCart, getUserCart };
