# Video Game Review Platform

## Overview
A web application for users to search, review, and manage video game reviews. Features include user authentication, game search via the RAWG API, review CRUD operations, and accessibility controls (font size, theme toggles).

## Local Setup
1. **Clone Repository**:
git clone https://github.com/your-username/video-game-review-platform.git
2. Install Dependencies for the server and client folders.
3. In the server folder create ".env" file with:
MONGO_URI= in mongoDB create a Database(game_reviews) with Collections(games, reviews, users)
RAWG_API_KEY=Your_own_Key_Free
JWT_SECRET=Your_Key
4. Run "node index.js" for the server, "npm start" for the client
5. Access Locally
Frontend: http://localhost:3000
Backend: http://localhost:5000

## Live Deployments
Backend: https://video-game-review-platform-backend.onrender.com/
Frontend: https://video-game-review-platform-frontend-git-main-khuders-projects.vercel.app/

## API Routes
Auth:
POST /api/auth/register - Register a user
POST /api/auth/login - Login a user

Games:
GET /api/games - Fetch all games
GET /api/games/search?q={query} - Search games via RAWG API

Reviews:
GET /api/reviews/my-reviews - Fetch user’s reviews (auth required)
POST /api/reviews - Create a review (auth required)
PUT /api/reviews/:id - Update a review (auth required)
DELETE /api/reviews/:id - Delete a review (auth required)

## External APIs
RAWG API: Used for searching video games (/api/games/search).

## Credits
Built with React, Node.js, Express, and MongoDB.
Deployed on Vercel (frontend) and Render (backend).
Game data provided by RAWG API.
