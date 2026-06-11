
var express = require('express');

var handler = require('./controllers/handler');

const nodemailer = require('nodemailer');

const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); // Uses Cloudflare & Google DNS
const mongoose = require('mongoose');
const { type } = require('node:os');

var app = express();
app.use(express.static('./public'));
app.use(express.json());

app.set('view engine', 'ejs');


const urll = 'mongodb+srv://nmchunu5_db_user:Nhlaka95@cluster0.wkktwtf.mongodb.net/item?appName=Cluster0';
mongoose.connect(urll)
.then((results)=> app.listen(3000),console.log("Listening To Port:3000"))
.catch((err) => console.log(err));

var email_Verification_schema = new mongoose.Schema({
        useremail:{ type:String},
        code:{type:String},
        
        createdAt:{
            type:Date,
            default:Date.now,
            expires:600
        }

},{timestamps:true});

const UserEmail = mongoose.model('UserEmail',email_Verification_schema);

var user_profile_schema = new mongoose.Schema({
    username:{type:String},
    userpassword:{type:String},
    useremail_Key:{type:String},
},{timestamps:true});

const UserProfile = mongoose.model('UserProfile',user_profile_schema);

handler(app,UserEmail,UserProfile,nodemailer);
//module.exports = Blog;





