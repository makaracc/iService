const express = require("express");
const validator = require("validator");
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require("mongoose")
const IServiceModel = require("./models/IServiceUser");
const { json } = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session")
const googlePassport = require("./google-passport")
const bcrypt = require("bcrypt")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());

const saltRounds = 10;

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

mongoose.connect("mongodb+srv://makara:220101@cluster0.ynskd.mongodb.net/IServiceDB?retryWrites=true&w=majority", {useNewUrlParser: true})


app.get('/failed', (req, res) =>{
  res.send("Fail to login with google!")
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.sendFile(__dirname+'/index.html');
  });

app.get("/signup", (req, res) =>{
  res.sendFile(__dirname + "/signup.html")
})



// login post request
app.post("/", async (req, res) => {
  const pass = req.body.login_password;
   IServiceModel.find({email: req.body.login_email},function(err, result){
    if(err){console.log(err);
    }else{
      const data = result;
      if(data.length > 0){
        console.log(data)
        try{
          data.forEach(element =>{
            bcrypt.compare(pass, element.hash).then((compare_result) =>{
              if(compare_result){
               console.log("login succeed!");
               res.sendFile(__dirname+'/index.html')
              }else{
               console.log("Incorrect Email password");
              }
           })
          })
           
        }catch(err){
          console.log(err);
        }
    }else{
        console.log("Email has not registered!");
      }
    }

  })

});

app.post("/signup", async (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const country = req.body.country;
  const email_adr = req.body.email;
  if (!validator.isEmail(email_adr)) {
    console.log("Email is not valid");
  }
  const pass = req.body.password;
  const confirmpass = req.body.confirm_password;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const phone = req.body.phone;

  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashpass = await bcrypt.hashSync(pass, salt);
  const hashconfirmpass = await bcrypt.hashSync(confirmpass, salt);

  console.log("hash:" + hashpass);
  console.log("confirm hash:" + hashconfirmpass);

  if (validator.equals(hashpass, hashconfirmpass)) {
    const iServiceDB = new IServiceModel({
      email: email_adr,
      first_name: firstName,
      last_name: lastName,
      hash: hashpass,
      country: country,
      address: address,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
    });
    iServiceDB.save().catch((err) => console.log(err));
    // mongoose.connection.close();
    if (res.statusCode === 200) {
      const data = {
        members: [
          {
            email_address: email_adr,

            status: "subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName,
            },
          },
        ],
      };
      jsonData = JSON.stringify(data);

      // const request = https.request(url, options, (res) => {
      //   res.on("data", (data) => {
      //     "Succeed!"
      //   });
      // });

      // request.write(jsonData);
      // request.end();

      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/404.html");
    }
  } else {
    console.log("Comfirm password confirm does not match!");
  }
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 1337;
}
app.listen(port, (req, res)=>{
    console.log("server is running on port " + port)
})
