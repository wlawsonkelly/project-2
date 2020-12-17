var dotenv = require("dotenv").config();

$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var usernameInput = $("input#username-input")
    var passwordInput = $("input#password-input");

    let emailCheckBox = $("#customSwitch1");
  
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com/?format=json&count=1&gender=b&maxage=40&minage=30&cc=all&email=gmail.com%2Cyahoo.com&pwlen=12&ip=a&phone=l%2Ct%2Co&uuid=1&lic=1&color=1&seed=helloworld&images=1",
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "2a3ff2005fmsh8e47ce61e569efdp1fefefjsn5fa2b36d932c",
          "x-rapidapi-host": "dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com"
        }
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
   
      var userData = {
        email: emailInput.val().trim(),
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim(),
        emailable: emailCheckBox.val(),
        profileUrl: response[0].image
      };
  
      if (!userData.email || !userData.username || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.username, userData.password, userData.emailable, userData.profileUrl);
      emailInput.val("");
      usernameInput.val("");
      passwordInput.val("");
    });
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, username, password, emailable, profileUrl) {
      $.post("/api/signup", {
        email: email,
        username: username,
        password: password,
        emailable: emailable,
        profileUrl: profileUrl
      })
        .then(function(data) {
          window.location.replace("/home");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
    function handleModal() {
        $('#myModal').modal('show');
        $('#true-btn').on("click", function() {
          emailAble = true
        });
        
    }
  });