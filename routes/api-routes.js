// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      profileUrl: req.body.profileUrl
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        username: req.user.username,
        id: req.user.id,
        profileUrl: req.user.profileUrl
      });
    }
  });
  app.get("/api/comment/:videoId", function(req, res) {
    console.log("getting comments")
    console.log(req.body)
    // findAll returns all entries for a table when used with no options
    db.Comment.findAll({
      where: {
        VideoId: req.params.videoId
      }
    }).then(function(dbComment) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbComment);

    }).catch(function(err) {
      res.status(401).json(err);
    });
  });

app.post("/api/comment", function(req, res) {
  console.log(req.body);
  // create takes an argument of an object describing the item we want to
  // insert into our table. In this case we just we pass in an object with a text
  // and complete property (req.body)
  db.Comment.create({
    author: req.body.author,
    body: req.body.body,
    videoUrl: req.body.videoUrl,
    VideoId: req.body.VideoId,
    profileUrl: req.body.profileUrl
  }).then(function(dbComment) {
    // We have access to the new todo as an argument inside of the callback function
    res.json(dbComment);
  });
});
app.get("/api/video/:id", function(req, res){
  console.log("finding video");
  console.log(req.body);
  db.Video.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(dbVideo){
    res.json(dbVideo);
  }).catch(function(err) {
    res.send(err);
  });
});
app.put("/api/video", function(req, res){
  console.log(req.body.views);
  db.Video.update(
    {
      views: req.body.views
    },
    {
    where: {
      id: req.body.id
    }
  }).then(function(dbVideo){
    console.log(dbVideo)
    res.json(dbVideo);
  }).catch(function(err) {
    res.send(err);
  });
});
};
