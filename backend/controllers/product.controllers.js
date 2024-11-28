import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestSeller } =
    req.body;

  if (
    [name, description, price, category, subCategory, sizes, bestSeller].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Get uploaded images if available
  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0];
  const image4 = req.files.image4 && req.files.image4[0];

  // Filter out undefined images
  const images = [image1, image2, image3, image4].filter(
    (item) => item !== undefined
  );

  // Upload images to Cloudinary and get secure URLs
  let imagesUrl = await Promise.all(
    images.map(async (item) => {
      let result = await cloudinary.uploader.upload(item.path, {
        resource_type: "image",
      });
      return result.secure_url;
    })
  );

  // Create new product with provided data and uploaded images
  const product = await Product.create({
    name,
    description,
    category,
    subCategory,
    price: Number(price),
    bestSeller: bestSeller === true,
    sizes: JSON.parse(sizes),
    image: imagesUrl,
    date: Date.now(),
  });

  return res
    .status(201)
    .json(new ApiResponse(200, product, "Product added successfully!"));
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  // Check if products were found
  if (!products || products.length === 0) {
    throw new ApiError(404, "No products found");
  }

  // Return the fetched products
  return res
    .status(200)
    .json(new ApiResponse(200, products, "All products fetched successfully!"));
});

const removeProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new ApiError(404, "Product not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"));
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully!"));
});

export { addProduct, getProducts, removeProduct, getSingleProduct };
