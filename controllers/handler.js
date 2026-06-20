
//require('dotenv').config();
const bodyParser = require('body-parser');
const crypto = require('crypto');

const sendVerificationEmail = require('../public/asserts/nodemailer');


const urlencodedParser = bodyParser.urlencoded({extends:false});


var handle = function(app,UserEmail,UserProfile,nodemailer){

    app.get('/',function(req,res){
        res.render('index');
        console.log('sent'); 
    })

    app.get('/signup',function(req,res){ 
        res.render('signup');
        console.log('sent1');   
    })

    app.get('/about',function(req,res){
        res.render('about');
        console.log('about page');
    })

    app.get('/contacts',function(req,res){
        res.render('contacts');
        console.log('contacts page');
    })

    app.get('/service',function(req,res){
        res.render('service');
        console.log('service page');
    })
    
    app.get('/signup/signupP',function(req,res){
        
        UserEmail.find().then((result)=>{
            res.render('signupP',{data:result[0].useremail});
            console.log(result[0].useremail);

        })
        .catch((err) => {
                console.error("Page Display Error:", err);

                res.status(500).send("Error Dispalying Page");
            });
        console.log('Creating Username and PassWord');
        }) 
   

    app.get('/home',function(req,res){
        Blog.find().then((result)=>{
            res.render('home',{todo:result});
        })

    });

    
app.post('/Formdata/:form_url', urlencodedParser, function(req, res){

    var form_url = req.params.form_url;

       
    if(form_url === 'email_verifyer')
    {
        // Create and save the new database entry using the form data
        console.log(req.body);
        var verification = req.body;
        verification.code = crypto.randomInt(100000, 999999).toString();
        var userEmail = verification.useremail;
        var code = verification.code;
    
        async function run(userEmail,code) {

            var userEmail = userEmail;
            var code = code;

            var sent = await sendVerificationEmail(userEmail,code);
            console.log(sent);
            if(sent === true){

            
                new UserEmail(verification).save()
                    .then((result) => {
                        console.log("Saved to DB:", result); 
                        // Render the partial view or full view with the result data
                        res.json('signupP');

                    })
                    .catch((err) => {
                        console.error("Database Save Error:", err);

                        res.status(500).send("Error saving data");
                    });
            }/*else{
                res.json('signp')
            } */
        } 
        
        run(userEmail,code);
    };

    if(form_url === 'user_profile')
    {
        // Create and save the new database entry using the form data
        console.log(req.body);
        new UserProfile(req.body).save()
            .then((result) => {
                console.log("Saved to DB:", result); 
                // Render the partial view or full view with the result data
                //res.render('signupP');
            })
            .catch((err) => {
                console.error("Database Save Error:", err);

                res.status(500).send("Error saving data");
            });

        
        
    }
});

 

    app.delete('/home/:id',function(req,res){
        const id =req.params.id;
        console.log(id);
        Blog.findByIdAndDelete(id).then((result)=>{
             res.json(result);  
        })

       
    });

};
module.exports = handle;