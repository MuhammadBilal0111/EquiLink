const express = require('express');
const CategoryController = require('../controllers/category.controller');

const router = express.Router();

router.get('/get-all-categories', CategoryController.getAllCategories);

module.exports = router;