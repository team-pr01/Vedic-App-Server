"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const recipe_model_1 = __importDefault(require("./recipe.model"));
/**
 * Create a new recipe
 */
const addRecipe = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.default.create(payload);
    return result;
});
// Get all recipes (optional keyword search)
const getAllRecipes = (keyword, category) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (keyword) {
        query.$or = [{ name: { $regex: keyword, $options: "i" } }];
    }
    if (category) {
        query.category = { $regex: category, $options: "i" };
    }
    const result = yield recipe_model_1.default.find(query);
    return result;
});
//  Get single recipe by ID
const getSingleRecipeById = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield recipe_model_1.default.findById(recipeId);
    if (!recipe) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Recipe not found");
    }
    return recipe;
});
// Update recipe by ID
const updateRecipe = (recipeId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedRecipe = yield recipe_model_1.default.findByIdAndUpdate(recipeId, payload, {
        new: true,
        runValidators: true,
    });
    if (!updatedRecipe) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Recipe not found");
    }
    return updatedRecipe;
});
// Delete recipe by ID
const deleteRecipe = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield recipe_model_1.default.findByIdAndDelete(recipeId);
    if (!deleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Recipe not found");
    }
    return deleted;
});
exports.RecipeServices = {
    addRecipe,
    getAllRecipes,
    getSingleRecipeById,
    updateRecipe,
    deleteRecipe,
};
