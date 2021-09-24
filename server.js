const express = require("express");
const validator = require("validator");
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require("mongoose");
const IServiceModel = require("./models/IServiceUser");
const { json } = require("body-parser");
const passport = require("passport");
const expreSession = require("express-session");
const cookieSession = require("cookie-session");
const googlePassport = require("./google-passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require('passport-local')
const STRIPE_PUBLIC_KEY = 'pk_test_51Jc6cbHXKOWLYjLRzBavS4GeihsDxkPgcAMoIpyNu0AH1SqLCMDYhgLk0VWCFb8TSxOqwdnUFlo09ea4VmPrZXOY00bLJWCAyT';
const STRIPE_SECRET_KEY = 'sk_test_51Jc6cbHXKOWLYjLRftQUnWaxy0AKbiLaNTFZ3hjXjeyxpXpw1zWLuhaZUl9cxzm80EQpnAL5CYrVPzo9dEJWeipn00389UVHQ2';
const stripe = require('stripe')(STRIPE_SECRET_KEY);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('trust proxy', 1)
app.use(
  expreSession({
    cookie: { 
      maxAge: 120000000,
    },
    resave: false,
    saveUninitialized: false,
    secret: "asdfjksadlkjfaslkdf&&j*la987ksdjf@",
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  "mongodb+srv://makara:220101@cluster0.ynskd.mongodb.net/IServiceDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

passport.use(new LocalStrategy(IServiceModel.authenticate()));
passport.serializeUser(IServiceModel.serializeUser());
passport.deserializeUser(IServiceModel.deserializeUser());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/failed", (req, res) => {
  res.send("Fail to login with google!");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: '/home',
    failureRedirect: "/failed" }),
  function (req, res) {
    
  }
);

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.get("/home", isLoggedIn, (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/logout", (req, res) => {
  req.user = null;
  req.session.destroy();
  req.logout();
  res.redirect("/");
});

// login post request
app.post("/", passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/'
  }), async (req, res) => {
  // const pass = req.body.login_password;
  
  })
  // IServiceModel.find({ email: req.body.login_email }, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     const data = result;
  //     if (data.length > 0) {
  //       try {
  //         data.forEach((element) => {
  //           bcrypt.compare(pass, element.hash).then((compare_result) => {
  //             if (compare_result) {
  //               console.log("login succeed!");
  //               res.redirect("/home");
  //             } else {
  //               console.log("Incorrect Email password");
  //             }
  //           });
  //         });
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     } else {
  //       console.log("Email has not registered!");
  //     }
    // }
  // });
// });

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


  if (validator.equals(hashpass, hashconfirmpass)) {
    IServiceModel.register(
      {
        email: email_adr,
        username: email_adr,
        first_name: firstName,
        last_name: lastName,
        // hash: hashpass,
        country: country,
        address: address,
        city: city,
        state: state,
        zip: zip,
        phone: phone,
      },
      pass,
      (err, user) => {
        if (err) {
          console.log(err);
          res.redirect("/signup");
        } else {
          res.sendFile(__dirname + "/success.html");
        }
      }
    );
    // if (res.statusCode === 200) {
    //   const data = {
    //     members: [
    //       {
    //         email_address: email_adr,

    //         status: "subscribed",
    //         merge_fields: {
    //           FNAME: firstName,
    //           LNAME: lastName,
    //         },
    //       },
    //     ],
    //   };
    //   jsonData = JSON.stringify(data);

    //   // const request = https.request(url, options, (res) => {
    //   //   res.on("data", (data) => {
    //   //     "Succeed!"
    //   //   });
    //   // });

    //   // request.write(jsonData);
    //   // request.end();

    //   res.sendFile(__dirname + "/success.html");
    // } else {
    //   res.sendFile(__dirname + "/404.html");
    // }
  } else {
    console.log("Comfirm password confirm does not match!");
  }
});

// Expert API
app
  .route("/experts")
  // POST request
  .post((req, res) => {
    const expert = new Expert({
      name: req.body.name,
      phone: req.body.phone,
      password: req.body.password,
      address: req.body.address,
    });
    expert.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully added a new expert!");
      }
    });
  })
  // GET All Experts
  .get((req, res) => {
    Expert.find((err, experts) => {
      if (err) {
        res.send(err);
      } else {
        res.send(experts);
      }
    });
  })
  // Delete
  .delete((req, res) => {
    Expert.deleteMany((err) => {
      if (err) {
        res.send.apply(err);
      } else {
        res.send("Successfully deleted all experts");
      }
    });
  });

app
  .route("/experts/:_id")
  .get((req, res) => {
    // console.log(req.params._id)

    Expert.findOne({ _id: req.params._id }, (err, foundExpert) => {
      if (!err) {
        res.send(foundExpert);
      } else {
        res.send("No match expert found!");
      }
    });
  })
  .put((req, res) => {
    Expert.updateMany(
      { _id: req.params._id },
      {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password,
      },

      (err, doc) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully updated expert!\n");
        }
      }
    );
  })
  .patch((req, res) => {
    Expert.updateMany(
      { _id: req.params._id },
      {
        $set: {
          address: req.body.address,
          password: req.body.password,
          phone: req.body.phone,
        },
      },

      (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully updated expert!\n");
        }
      }
    );
  })
  .delete((req, res) => {
    Expert.deleteOne({ _id: req.params._id }, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Delete successfully!");
      }
    });
  });

  // app.get('/payment', (req, res)=>{
  //   res.sendFile(__dirname+'/payment.html')
  // })
  
  const charge = (token, amt)=> {
    return stripe.charges.create({
      amount: amt * 100,
      currency: 'usd',
      source: token,
      description: 'Statement Description'
    })
  }
// View Engine Setup 
app.set('views', __dirname+ '/views') 
app.set('view engine', 'ejs') 



app.get('/paymen', function(req, res){ 
  res.render('Home', { 
  key: STRIPE_PUBLIC_KEY
  }) 
}) 

  // app.get('/paymen', async (req, res) =>{
  //   res.sendFile(__dirname+"/payment.html")
  //   // try{
  //   //   let data = await charge(stripe.createToken({name:"john"}), 50);
  //   //   console.log(data);
  //   //   res.sendFile(__dirname+'/accepted.html')
  //   // }catch(e){
  //   //   res.send('error' + e);
  //   // }
  // });


  app.post('/payment', (req, res) =>{
    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
      .then(customer => {
        console.log(customer.id)
        return stripe.charges.create({
          amount: 3000,
          description: 'Cleaning Service',
          currency: 'USD',
          customer: customer.id
        })
      })
      .then((charge)=>{
        res.send('Payment Succeed!\n' + charge)
      })
      .catch(error => {
        res.send('Payment Failed!\n' + error)
        console.error(error);
      });
  });




let port = process.env.PORT;
if (port == null || port == "") {
  port = 1337;
}
app.listen(port, (req, res) => {
  console.log("server is running on port " + port);
});
