const express = require("express");
const validator = require("validator");
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require("mongoose")
const IServiceDB = require("./models/IServiceUser")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));
const mailChimpAPI = "2c1ca320d1a0a62a37a31a9aacad457d-us5";
const audience_id = "68cb2e365e";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


mongoose.connect("mongodb+srv://makara:220101@cluster0.ynskd.mongodb.net/IServiceDB?retryWrites=true&w=majority", {useNewUrlParser: true})

app.post("/", (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const country = req.body.country;
  const email_adr = req.body.email;
  if(!validator.isEmail(email_adr)) {console.log("Email is not valid")}
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const phone = req.body.phone;
  if(validator.equals(req.body.password,req.body.confirm_password)){
    const iServiceDB = new IServiceDB({
      email: email_adr,
          first_name: firstName,
          last_name: lastName,
          country: country,
          address: address,
          city: city,
          state: state,
          zip: zip,
          phone: phone,
    })
    iServiceDB.save()
    .catch((err) => console.log(err));
    if(res.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    }else{
      res.sendFile(__dirname+ "/404.html")
    }
  }else{
    console.log("Comfirm password confirm does not match!")
  }

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 1337;
}
app.listen(port, (req, res)=>{
    console.log("server is running on port " + port)
})
