// const comment = require("../../../models/comment");  
 $(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
  var $newItemInput = $("input.new-item");
  // Our new todos will go inside the todoContainer
  var $commentContainer = $(".comment-container");
  // Adding event listeners for deleting, editing, and adding todos
  // $(document).on("click", "button.delete", deleteComment);
  // $(document).on("click", "button.complete", toggleComplete);
  // $(document).on("click", ".comment-item", editcomment);
  // $(document).on("keyup", ".comment-item", finishEdit);
  // $(document).on("blur", ".comment-item", cancelEdit);
  $(document).on("submit", "#comment-form", insertComment);
  
  $(function(){
    var $refreshButton = $('#refresh');
    var $results = $('#css_result');
    
    function refresh(){
      var css = $('style.cp-pen-styles').text();
      $results.html(css);
    }
  
    refresh();
    $refreshButton.click(refresh);
    
    // Select all the contents when clicked
    $results.click(function(){
      $(this).select();
    });
  });

  var comments = [];
  getComments();


function initializeRows() {
    $commentContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < comments.length; i++) {
      rowsToAdd.push(createNewRow(comments[i]));
    }
     $commentContainer.prepend(rowsToAdd);
  };


  function getComment() {
    $.get("/api/comment", function(data) {
      comment = data;
      initializeRows();
    })};


  function updateComment(comment) {
    $.ajax({
      method: "PUT",
      url: "/api/comment",
      data: comment
    }).then(getComment);
  }

  function insertComment(event) {
    event.preventDefault();
    var comment = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/comment", comment, getComment);
    $newItemInput.val("");
  };
  
   
  
  function createNewRow(comment) {
    var $newInputRow = $(
      [
        "<li class='list-group-item comment-item'>",
        "<span>",
        comment.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    ); $newInputRow.find("button.delete").data("id", comment.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("todo", comment);
    if (comment.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }});
