/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Recipe from "./recipe.model";
import { TRecipe } from "./recipe.interface";

/**
 * Create a new recipe
 */
const addRecipe = async (payload: TRecipe) => {
  const result = await Recipe.create(payload);
  return result;
};

// Get all recipes (optional keyword search)
const getAllRecipes = async (keyword: string, category: string) => {
  const query: any = {};

  if (keyword) {
    query.$or = [{ name: { $regex: keyword, $options: "i" } }];
  }

  if (category) {
    query.category = { $regex: category, $options: "i" };
  }

  const result = await Recipe.find(query);
  return result;
};

//  Get single recipe by ID
const getSingleRecipeById = async (recipeId: string) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, "Recipe not found");
  }
  return recipe;
};

// Update recipe by ID
const updateRecipe = async (recipeId: string, payload: Partial<TRecipe>) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedRecipe) {
    throw new AppError(httpStatus.NOT_FOUND, "Recipe not found");
  }

  return updatedRecipe;
};

// Delete recipe by ID
const deleteRecipe = async (recipeId: string) => {
  const deleted = await Recipe.findByIdAndDelete(recipeId);
  if (!deleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Recipe not found");
  }
  return deleted;
};

export const RecipeServices = {
  addRecipe,
  getAllRecipes,
  getSingleRecipeById,
  updateRecipe,
  deleteRecipe,
};
