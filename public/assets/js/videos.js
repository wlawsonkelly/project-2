// const comment = require("../../../models/comment");  
 $(document).ready(function() {
  var yourComment = $("#your-comment-input");
  var commentContainer = $(".comments-container");
  var videoUrl = $("#video-url").attr("src").toString();
  var videoId = $('.main-video').attr('id');

  var commentNumber = 0;

  var totalViews = 0;

  $("#comment-btn").on("click", function(event){
    event.preventDefault();
    console.log("commenting");
    insertComment();
  })

  function getVideoInfo() {
    $.get(`/api/video/` + videoId, function(data){
      console.log(data);
      console.log("here is the data");
      $("#video-title").text(data.title)
      $("#view-number").text(data.views + 1);
      totalViews = data.views + 1
      $("#upload-date").text(data.createdAt);
      updateVideoViews(data);
    });
    
  }

  function updateVideoViews(data) {
  data.views = data.views + 1;
  $.ajax({
    method: "PUT",
    url: "/api/video",
    data: data
  }).then(console.log(data));
  }
  

  function getComments() {
    $.get(`/api/comment/`+ videoId, function(data){
      console.log(data);
      commentNumber = data.length;
      $("#comments-number").text(commentNumber)
      for (var i = 0; i < data.length; i++) {
        let newRow = $(`<div class="row comment-row"> <div class="col-md-3"> </div> <div class="col-md-2"> <img class="comment-avatar" src="https://www.mandysam.com/img/random.jpg" alt=""> <span id="comment-username">${data[i].author}</span></div><div class="col-md-4"><span id="user-comment"> ${data[i].body} </span></div><div class="col-md-3"></div></div>`);
        commentContainer.prepend(newRow);
      };
    });
  };

  function insertComment() {
    console.log("above is video url")
    //make less ugly later
    $.get("/api/user_data").then(function(data) {
      //need to perfect this get route
      console.log("hello");
      console.log(data);
    var comment = {
      author: data.username,
      body: yourComment.val().trim(),
      videoUrl: videoUrl,
      VideoId: videoId
    };

    $.post(`/api/comment`, comment, newComment(comment));
    yourComment.val("");
  });
};

  function newComment(comment) {
    let newRow = $(`<div class="row comment-row"> <div class="col-md-3"> </div> <div class="col-md-2"> <img class="comment-avatar" src="https://www.mandysam.com/img/random.jpg" alt=""> <span id="comment-username">${comment.author}</span></div><div class="col-md-4"><span id="user-comment"> ${comment.body} </span></div><div class="col-md-3"></div></div>`);
    //MORE CODE HERE
    commentNumber++;
    $("#comments-number").text(commentNumber)
    commentContainer.prepend(newRow);
   };
   getVideoInfo();
  getComments();
  });
