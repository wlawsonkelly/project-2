$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var usernameInput = $("input#username-input")
    var passwordInput = $("input#password-input");
  
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      let emailAble = confirm("Do you want to get emails about new lessons from us?");
      var userData = {
        email: emailInput.val().trim(),
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim(),
        emailable: emailAble
      };
  
      if (!userData.email || !userData.username || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.username, userData.password, userData.emailable);
      emailInput.val("");
      usernameInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, username, password, emailable) {
      $.post("/api/signup", {
        email: email,
        username: username,
        password: password,
        emailable: emailable
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
  });