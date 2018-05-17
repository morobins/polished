$(document).ready(function () {
  /* global moment */

  function displayCards() {
    $('.card').empty();

    $.ajax({
      url: "/api/products",
      method: 'GET',
    }).then(function (results) {
      res.json(results);
      console.log(results);
      for (var i = 0; i < results.length; i++) {

        // cardContainer holds all of our posts
        var cardContainer = $(".card-columns");
        var postCategorySelect = $("#category");
        // Click events for the edit and delete buttons
        
        // Variable to hold our posts
        var posts;

        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var deleteBtn = $("<button>");
        deleteBtn.text("Delete");
        deleteBtn.attr("data-productid", results[i].id)
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("Edit");
        editBtn.attr("data-productid", results[i].id)

        editBtn.addClass("edit btn btn-info");


        var cardImage = $("<img>");
        cardImage.addClass("card-img-top").attr("src", post.imgUrl)


      }
    });



  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentProduct = $(this).attr("data-productid")
    $.ajax({
      url: "/api/products/" + currentProduct,
      method: "DELETE"
    }).then(function(data) {
      console.log(data);
    })
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentProduct = $(this).attr("data-productid")

    window.location.href = "/add?post_id=" + currentProduct.id;
  }
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);


});