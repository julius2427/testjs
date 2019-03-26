
const express = require("express");
const Joi = require('joi');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

let userslist=[
    {
        id:1,
        username:'julius1',
        password:'blue',
        email:'test@test.com',
        producttype: 'music',
        activestatus: true
    },
    {
        id:2,
        username:'julius2',
        password:'blue2',
        email:'test2@test.com',
        producttype: 'music2',
        activestatus: true
    },
    {
        id:3,
        username:'julius3',
        email:'test3@test.com',
        producttype: 'music3',
        activestatus: true
    },
];

app.listen(port, ()=> console.log(`Listening on port ${port}`));

//create new user account

//this is playing my db currently


app.get('/api/hello', (req,res) =>{
    res.send('Hello World');
});

app.get('/api/userlist', (req,res)=>{
    res.send(userslist);
});

app.post('/api/createusers', (req,res)=>{
    const schema = {
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        email: Joi.string().email().required(),
        producttype: Joi.string().alphanum().min(3).max(30),
        activestatus: Joi.boolean().required()
    };
    const result = Joi.validate(req.body, schema);
    console.log(result);
    //Sending 400 if any errors come back
    if(result.error){
        res.status(400).send(result.error);
        return;
    }

    const users = {
        id: userslist.length + 1,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        producttype: req.body.producttype,
        activestatus: req.body.activestatus
    };
    userslist.push(users);
    res.send(users);
    

    
});
//update user account
//disable user account
//