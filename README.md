### Kano World Takehome Task ###

#### The Task ####
The code provided gives a skeleton web app (frontend and api) which is similar to our own Kano World app (albeit with some rather naive security !).

The home page should display a scrolling feed of the latest creations from other users including reactions to those creations.

Your task is to implement the Feed component on the front end and the related api call. On the server-side you will need to implement the feed endpoint and also middleware to ensure that the user is authenticated and retrieve the user details.

Feel free to add your favourite libraries but please stick with the base express, SQL, react stack. Make sure we are able to run your server side code locally with `npm install` 

We have not added a unit testing framework to the server but feel free to add your favourite and implement some tests.

Please do NOT spend longer than 4 hrs on the task. You do NOT need to complete the task.

#### What we are looking for ####
- We want to get a sense of your experience, priorities and strengths as a coder. 
- Be sure to implement code on both the server and client so that we can get a sense of your full stack skills but otherwise feel free to focus on what you do best whether it's test-driven development, writing stylish css or something else. 
- We're not expecting the code to be finished or that the front end output should look polished.
- We'll use the code that you've written as a jumping off point for discussion in your technical interview. This will be a quite informal discussion where you can explain your thought process about the code you wrote and where you would go next with it. 

#### Getting started ####
The app is built with node 18.12
You will also need sqlite3

Environment variables can be found inside dev-env. Feel free to change test user & password as you experiment

Server-side:
- `nvm install 18.12.1 && nvm use` to install/use node 18.12
- `npm install` to get started
- `npm run build-db` will create a fully populated database in a file called database.db
- `npm run start` spins up the server

Client-side:

This is a create react app.
- `nvm install 18.12.1 && nvm use` to install/use node 18.12
- `npm install` to get started 
- `npm run start` will get the app running
- NB. the server app must also be running and the database must be populated

