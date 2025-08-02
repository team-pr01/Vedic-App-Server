import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RecipeServices } from "./recipe.services";

// Add a recipe (for admin)
const addRecipe = catchAsync(async (req, res) => {
  const result = await RecipeServices.addRecipe(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recipe added successfully",
    data: result,
  });
});

// Get all recipes with optional keyword filter
const getAllRecipes = catchAsync(async (req, res) => {
  const { keyword, category } = req.query;
  const result = await RecipeServices.getAllRecipes(keyword as string, category as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recipes fetched successfully.",
    data: result,
  });
});

// Get a single recipe by ID
const getSingleRecipeById = catchAsync(async (req, res) => {
  const { recipeId } = req.params;
  const result = await RecipeServices.getSingleRecipeById(recipeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recipe fetched successfully.",
    data: result,
  });
});

// Update a recipe
const updateRecipe = catchAsync(async (req, res) => {
  const { recipeId } = req.params;
  const result = await RecipeServices.updateRecipe(recipeId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recipe updated successfully.",
    data: result,
  });
});

// Delete a recipe
const deleteRecipe = catchAsync(async (req, res) => {
  const { recipeId } = req.params;
  const result = await RecipeServices.deleteRecipe(recipeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recipe deleted successfully.",
    data: result,
  });
});

export const RecipeControllers = {
  addRecipe,
  getAllRecipes,
  getSingleRecipeById,
  updateRecipe,
  deleteRecipe,
};
