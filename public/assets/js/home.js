$(document).ready(function() {
    $('#1').on("click", function(event){
        console.log("clicked");
        localStorage.setItem("id", 1)
        localStorage.setItem("url", "https://www.youtube.com/embed/KSBLmWUVQo0")
        location.href = "/video";
    })
    $('#2').on("click", function(event){
        console.log("clicked");
        localStorage.setItem("id", 2)
        localStorage.setItem("url", "https://www.youtube.com/embed/rMMpTUvhEFY")
        location.href = "/video";
    })
    $('#3').on("click", function(event){
        console.log("clicked");
        localStorage.setItem("id", 3)
        localStorage.setItem("url", "https://www.youtube.com/embed/x7tmP6Ox91Q")
        location.href = "/video";

    })
});
  