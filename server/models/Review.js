const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    gameId: { type: String, required: true }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);