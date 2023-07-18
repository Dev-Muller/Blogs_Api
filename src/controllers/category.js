const CategoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await CategoryService.createCategory(name);
    return res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    return res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};