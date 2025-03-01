Social Network API - MongoDB Backend

# 📌 Description

This project is a MongoDB-powered API for a social network web application, allowing users to:
	•	Create an account with a username and email.
	•	Add thoughts (posts).
	•	React to thoughts.
	•	Manage a friend list.

Built using Express.js, MongoDB, and Mongoose, this API provides robust and scalable data handling for unstructured social media interactions.

## 📖 Table of Contents
	•	Installation
	•	Usage
	•	API Routes
	•	Testing with Insomnia
	•	Technologies Used
	•	Walkthrough Video
	•	Contributors
	•	License

# ⚙️ Installation

## 1️⃣ Clone the Repository

git clone https://github.com/your-github-username/mongodb-social-backend.git
cd mongodb-social-backend

## 2️⃣ Install Dependencies

npm install

## 3️⃣ Set Up Environment Variables

Create a .env file in the root directory with the following:

MONGODB_URI=mongodb://127.0.0.1:27017/socialNetworkDB
PORT=3001

## 4️⃣ Seed the Database (Optional)

To populate the database with sample users and thoughts:

npm run seed

## 5️⃣ Start the Server

npm run start:dev

Your server should now be running at:

http://localhost:3001

## 🚀 Usage

Starting the Server
	•	Development mode: npm run start:dev
	•	Production build: npm run build && npm start

The API uses RESTful routes and can be tested via Insomnia, Postman, or cURL.

## 🛠 API Routes

## 📌 User Routes (/api/users)

Method	Route	Description
GET	/api/users	Get all users
GET	/api/users/:userId	Get a single user (with thoughts & friends)
POST	/api/users	Create a new user
PUT	/api/users/:userId	Update a user
DELETE	/api/users/:userId	Delete a user and associated thoughts

## 📌 Friend Routes (/api/users/:userId/friends/:friendId)

Method	Route	Description
POST	/api/users/:userId/friends/:friendId	Add a friend
DELETE	/api/users/:userId/friends/:friendId	Remove a friend

## 📌 Thought Routes (/api/thoughts)

Method	Route	Description
GET	/api/thoughts	Get all thoughts
GET	/api/thoughts/:thoughtId	Get a single thought
POST	/api/thoughts	Create a thought
PUT	/api/thoughts/:thoughtId	Update a thought
DELETE	/api/thoughts/:thoughtId	Delete a thought

## 📌 Reaction Routes (/api/thoughts/:thoughtId/reactions)

Method	Route	Description
POST	/api/thoughts/:thoughtId/reactions	Add a reaction to a thought
DELETE	/api/thoughts/:thoughtId/reactions/:reactionId	Remove a reaction

# 🧪 Testing with Insomnia

## 1️⃣ Start the Server

npm run start:dev

## 2️⃣ Open Insomnia
	•	Test GET /api/users → Retrieve all users
	•	Test POST /api/users → Create a new user (example payload):

{
  "username": "newuser",
  "email": "newuser@example.com"
}


	•	Test POST /api/users/:userId/friends/:friendId → Add a friend
	•	Test POST /api/thoughts → Create a thought

{
  "thoughtText": "This is my first thought!",
  "username": "JohnDoe",
  "userId": "67c0d5b9c2aa1620d7369633"
}


	•	Test DELETE /api/thoughts/:thoughtId → Remove a thought
	•	Test POST /api/thoughts/:thoughtId/reactions → Add a reaction

## 🚀 If everything works, you should see the correct responses in JSON format!

🛠 Technologies Used
	•	Node.js - Backend runtime
	•	Express.js - Web framework
	•	MongoDB - NoSQL database
	•	Mongoose - ODM (Object-Document Mapping)
	•	TypeScript - Strongly typed JavaScript
	•	Insomnia - API testing

## 📺 Walkthrough Video

📌 https://youtu.be/BtResgO3fXk

## 👨‍💻 Contributors
	•	Tanner Flake (Author)
	•	Feel free to contribute by submitting a pull request!

## 📜 License

This project is licensed under the MIT License.

## 🚀 Final Notes
	•	✅ All routes tested successfully
	•	✅ Meets the challenge requirements
	•	✅ Includes seed data for easy testing
	•	✅ Clear documentation for testing in Insomnia