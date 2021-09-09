const express = require("express");
const validator = require("validator");
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require("mongoose");
const IServiceModel = require("./models/IServiceUser");
const bcrypt = require("bcrypt");
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const session = require('express-session')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Mailchimp api
const url = "https://us5.api.mailchimp.com/3.0/lists/68cb2e365e";
const options = {
  method: "POST",
  auth: "azi:2c1ca320d1a0a62a37a31a9aacad457d",
};


// get req for signup
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
// get req for signin
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

const saltRounds = 10;

mongoose.connect(
  "mongodb+srv://makara:220101@cluster0.ynskd.mongodb.net/IServiceDB?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

// app.post("/login", (req, res) => {
//  IServiceModel.isAu
// })

app.post("/login", async (req, res) => {
  const pass = req.body.login_password;
   IServiceModel.find({email: req.body.login_email},function(err, result){
    if(err){console.log(err);
    }else{
      const data = result;
      if(data.length > 0){
        try{
           bcrypt.compare(pass, data[0].hash).then((compare_result) =>{
             if(compare_result){
              console.log("login succeed!");
              res.sendFile(__dirname+"/home.html")
             }else{
              console.log("Incorrect Email password");
             }
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

app.post("/", async (req, res) => {
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

      const request = https.request(url, options, (res) => {
        res.on("data", (data) => {
          "Succeed!"
        });
      });

      request.write(jsonData);
      request.end();

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
app.listen(port, (req, res) => {
  console.log("server is running on port " + port);
});
