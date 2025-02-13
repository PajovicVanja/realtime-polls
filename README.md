# Poll App

Poll App is a full-stack application that lets users create polls, cast votes (as authenticated users), and view real-time updates using Socket.io. It also includes a comment feature for community engagement.

## Features

- **Poll Creation & Management:** Create polls with a title, multiple answer options, and an expiration time.
- **Voting Experience:** Vote on polls with immediate feedback and real-time vote updates.
- **Real-Time Updates:** Live vote count updates and dynamic charts using Socket.io and Chart.js.
- **User Authentication:** Sign up, log in, and manage your profile.
- **Comments:** Engage with other users by commenting on polls.

## Technologies Used

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Socket.io
- **Frontend:** React, TypeScript, React Router, Axios, Chart.js, Yarn
- **Styling:** Custom CSS with a modern design

## Setup

### Backend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/poll-app.git
   cd poll-app/backend
2. **Install dependencies:**

   ```bash
   npm install
3. **Create a .env file with your environment variables (MONGO_URI, JWT_SECRET).**

4. **Build:**
   ```bash
   npm run build
5. **Start the backend server:**

   ```bash
   npm start
### Frontend

1. **Navigate to the frontend folder:**

   ```bash
   cd ../frontend
2. **Install dependencies using Yarn:**

   ```bash
    yarn install
3. **Create a .env file with your API base URL (REACT_APP_API_BASE_URL=http://localhost:5000)**

4. **Start the frontend server using Yarn:
    ```bash
    yarn start


## Running with Docker
Poll App can also be run using Docker. The project includes Dockerfiles for both the backend and frontend, along with a docker-compose.yml file that orchestrates the containers and a MongoDB instance.

1. **Ensure Docker and Docker Compose are installed on your system.**

2. **From the project root, build and run the containers:**

   ```bash
   docker-compose up --build
3. **Access the application:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: Exposed on port 27017 (for development, use a MongoDB client to connect if needed).

4. **To stop the containers:**

- Press Ctrl+C in the terminal running docker-compose, then run:

   ```bash
   docker-compose down