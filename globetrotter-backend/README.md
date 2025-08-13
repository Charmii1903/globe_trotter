# Globetrotter Backend (Node.js + Express + MongoDB)

## Setup
1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Run in dev: `npm run dev` (nodemon)
4. API base: `http://localhost:5000/api`

## Important endpoints
- `POST /api/auth/register` { firstName, lastName, email, password, ... }
- `POST /api/auth/login` { email, password }
- `GET /api/users/me` (requires Authorization: Bearer TOKEN)
- `POST /api/trips` (requires auth) create trip
- `GET /api/trips` list trips
- `POST /api/itineraries/:tripId` (requires auth) save itinerary
- `GET /api/community` list posts
- `POST /api/community` (requires auth) create post

## Notes
The frontend you provided didn't yet call any APIs, so this backend expects the frontend to POST/GET to the endpoints above.