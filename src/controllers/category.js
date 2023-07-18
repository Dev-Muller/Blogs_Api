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

module.exports = {
  createCategory,
};