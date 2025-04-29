const Product = require("../models/products.model.js");

// Function to search products based on the query
exports.searchProducts = async (query) => {
    try {
        // Create a regex for a case-insensitive search
        const regex = new RegExp(query, "i");
        // Query the product collection and limit results to 5
        const products = await Product.find({ name: regex }).limit(5);
        return products;
    } catch (error) {
        console.error("Search Error:", error);
        return [];
    }
};
