/*
Author: @skywalkerSam
Purpose: face-detection-backend
Stardate: 12024.01.31.1039
*/
/*
TODOs:
- Code/Security Review
- Separate controllers for each endpoint ( Separation of Concerns! ) - DONE!
- Test each endpoint with the frontend - DONE!
- Get this server ready for deployment
- Deploy this server ( AWS Lightsail )
- Test the server
- Implement standard security measures
*/

const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const signup = require('./controllers/signup');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const port = 3333;
const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(cors());

const knex = require('knex')
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'notpostgres',
        database: 'prod'
    }
});

app.get('/', (req, res) => {res.json("Welcome to Face Detection API...")});

// Dependency Injection
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/signup', (req, res) => {signup.handleSignup(req, res, db, bcrypt, saltRounds)});
app.get('/profile/:userId', (req, res) => {profile.handleGetProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});


app.listen(port, () => {
    console.log(`\nServer running on: http://localhost:${port} \n\nPress Ctrl+C to stop.`)
})
