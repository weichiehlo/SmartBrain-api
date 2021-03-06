const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    }
  });
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')



const app = express();
app.use(express.json());
app.use(cors());



app.get('/', (req, res) =>{
    res.send("The server is running")
})




app.post('/signin', (req, res) =>{signin.handleSignin(req, res, knex, bcrypt)})
app.post('/register',  register.handleRegister(knex, bcrypt));
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)});
app.put('/image', (req, res) => {image.handleImage(req, res, knex)});
app.post('/imageurl', (req, res) => {image.handleAPICall(req, res)});
 

app.listen(process.env.PORT || 3000, () =>{
    console.log(`App is Running on Port ${process.env.PORT}`);
})



/**
 * 
 *  --> res = this is working
 *  signin --> POST = success/fail
 *   /register --> POST = user
 *  /profile/:userid  --> GET = user
 * /image --> PUT --> user
 * 
 */