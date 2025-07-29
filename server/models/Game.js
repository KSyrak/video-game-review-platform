const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    releaseDate: { type: String },
    platforms: [{ type: String }],
    coverImage: { type: String }, // From RAWG API
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
module.exports = mongoose.model('Game', gameSchema);