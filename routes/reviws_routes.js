const express = require('express');
const reviewModel = require('../Models/reviews_model');
const shopRoutes = express.Router();

// Route to post a single review
shopRoutes.post('/shop/review', async (req, res) => {
    const { token, transactionId, amount, review, rating } = req.body;

    try {
        let shopReview = await reviewModel.findOne({ token });

        if (!shopReview) {
            shopReview = new reviewModel({
                token,
                reviewsList: []
            });
        }

        shopReview.reviewsList.push({
            transactionId,
            amount,
            review,
            rating
        });

        await shopReview.save();
        res.status(201).json({ msg: 'Review added successfully!', review: shopReview });
    } catch (e) {
        console.error('Error adding review: ', e.message);
        res.status(500).json({ error: e.message });
    }
});

// Route to get all reviews for a specific shop
shopRoutes.post('/shop/reviews', async (req, res) => {
    const { token } = req.body;

    try {
        const shopReviews = await reviewModel.findOne({ token });

        if (!shopReviews) {
            return res.status(400).json({ msg: "No reviews found for this shop!" });
        }

        res.json(shopReviews);
    } catch (e) {
        console.error('Error fetching reviews: ', e.message);
        res.status(500).json({ error: e.message });
    }
});

module.exports = shopRoutes;
