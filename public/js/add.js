$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/add?post_id=1, postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var addForm = $("#addsub");
  var brandInput = $("#brand");
  var productInput = $("#productName");
  var colorInput = $("#color");
  var commentInput = $("#comment");
  var photoInput = $("#photo");
  var postCategorySelect = $("#category");
  // Giving the postCategorySelect a default value
  postCategorySelect.val("Nails");
  // Adding an event listener for when the form is submitted
  $(addForm).on("submit", function (event) {
    event.preventDefault();
    // Won't submit the post if we are missing a category
    // if (!postCategorySelect.val().trim()) {
    //   return;
    // }
    // Constructing a newPost object to hand to the database
    var newPost = {
      brand: brandInput.val().trim(),
      product_name: productInput.val().trim(),
      color: colorInput.val().trim(),
      notes: commentInput.val().trim(),
      photo: photoInput.val(),
      category: postCategorySelect.val()
    };

    console.log(newPost);

    $.post("/api/products", newPost)
        .done(function (data) {
          console.log(data);
          // console.log("name is: " + data.name)
          // $("#resultsModal").modal('toggle');
          // $("#bestFriend").text(data.name);
          // $('#friendImage').attr("src", data.photo);

        });
    

  //   // If we're updating a post run updatePost to update a post
  //   // Otherwise run submitPost to create a whole new post
  //   if (updating) {
  //     newPost.id = postId;
  //     updatePost(newPost);
  //   }
  //   else {
  //     submitPost(newPost);
  //   }
  // });

  // // Submits a new post and brings user to blog page upon completion
  // function submitPost(newPost) {
  //   console.log('submitting!');
  //   $.post("/api/products/", newPost, function() {
  //     window.location.href = "./../collection.html";
  //   });
  // }

  // // Gets post data for a post if we're editing
  // function getPostData(id) {
  //   $.get("/api/products/" + id, function(data) {
  //     if (data) {
  //       // If this post exists, prefill our add forms with its data
  //       brandInput.val(data.brand);
  //       productInput.val(data.productName);
  //       colorInput.val(data.color);
  //       commentInput.val(data.comment);
  //       photoInput.val(data.photo);
  //       postCategorySelect.val(data.category);
  //       // If we have a post with this id, set a flag for us to know to update the post
  //       // when we hit submit
  //       updating = true;
  //     }
  //   });
  // }

  // // Update a given post, bring user to the blog page when done
  // function updatePost(newPost) {
  //   $.ajax({
  //     method: "PUT",
  //     url: "/api/products",
  //     data: newPost
  //   })
  //     .then(function() {
  //       window.location.href = "./../collection.html";
  //     });
  // }
});
});
