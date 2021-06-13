# practice_memories_project
## Introduction
This is a practice project based on a Youtube tutorial on MERN stack.
- M - MongoDB
- E - Express
- R - React
- N - Node.js

The application is like a social media website where people can add memories with pictures.
People can also search for memories based on search query and tags.
People can edit/delete their created memories and like/dislike others' memories.

Setup:
 - run ``` npm install ``` to install all the dependencies in both client and server folders.
 - run ``` npm start ``` to start both frontend and backend servers in client and server folders respectively.

For the connection URL, you need to provide your own connection URL from MongoDB Atlas account.
PORT mentioned in server > index.js file can be of your choice. Default is 5000.

PORT and CONNECTION_URL are both maintained locally in .env file. A dependency called dotnv is already mentioned in server > package.json.
