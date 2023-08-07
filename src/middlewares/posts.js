const validateCategoriesId = async (req, res, next) => {
  const { categoryId } = req.body;
  const mapCategories = categoryId.map((id) => id);
  const isValid = mapCategories.every((id) => mapCategories.includes(id));
  if (!isValid) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

const validatePostContent = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
  next();
};

module.exports = { validateCategoriesId, validatePostContent };