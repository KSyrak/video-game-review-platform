const mongoose = require('mongoose');
const Game = require('./models/Game');
const Review = require('./models/Review');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;
const userId = '68870f530140ccaa80fc0ef1'; // Replace with test user’s _id from MongoDB Atlas

const games = [
    {
        title: 'Elden Ring',
        description: 'An action RPG by FromSoftware.',
        releaseDate: '2022-02-25',
        platforms: ['PC', 'PS5', 'Xbox'],
        coverImage: 'https://example.com/elden-ring.jpg',
        createdBy: userId,
    },
    {
        title: 'Cyberpunk 2077',
        description: 'An open-world RPG by CD Projekt Red.',
        releaseDate: '2020-12-10',
        platforms: ['PC', 'PS4', 'Xbox'],
        coverImage: 'https://example.com/cyberpunk.jpg',
        createdBy: userId,
    },
];

const reviews = [
    {
        gameId: null, 
        userId: userId,
        rating: 4,
        comment: 'Amazing world design!',
    },
    {
        gameId: null, 
        userId: userId,
        rating: 3,
        comment: 'Fun but had some bugs.',
    },
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Clear existing data 
        await Game.deleteMany({});
        await Review.deleteMany({});

        // Insert games
        const insertedGames = await Game.insertMany(games);
        console.log('Inserted games:', insertedGames);

        // Update reviews with game IDs
        reviews[0].gameId = insertedGames[0]._id;
        reviews[1].gameId = insertedGames[1]._id;

        // Insert reviews
        const insertedReviews = await Review.insertMany(reviews);
        console.log('Inserted reviews:', insertedReviews);

        console.log('Database seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();