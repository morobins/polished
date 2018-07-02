$(document).ready(function () {

  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var productId;
  var photoUrl;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?product_id=") !== -1) {
    productId = url.split("=")[1];
    getProductData(productId);
  }

  // Getting references to our form and input
  var addForm = $("form#add");
  var categoryInput = $("select#category");
  var brandInput = $("input#brand");
  var productNameInput = $("input#productName");
  var colorInput = $("input#color");
  var notesInput = $("textarea#notes");

  // When the submit button is clicked, we grab and append the values from form
  addForm.on("submit", function (event) {
    event.preventDefault();
    // Use FormData constructor to build a new multipart form (for handling images)
    var formData = new FormData();
    formData.append("category", categoryInput.val());
    formData.append("brand", brandInput.val().trim());
    formData.append("product_name", productNameInput.val().trim());
    formData.append("color", colorInput.val().trim());
    formData.append("notes", notesInput.val().trim());
    console.log(formData);
    console.log(colorInput.val().trim());
    if ($("#file-input").prop("files")[0]) {
      // append photo information to form (photo: {objOfPhotoInfo})
      console.log($("#file-input").prop("files"));
      formData.append("photo", $("#file-input").prop("files")[0], $("#file-input").prop("files")[0].name);
    } else {
      formData.append("photo", photoUrl);
    }

    categoryInput.val("Select a Category");
    brandInput.val("");
    productNameInput.val("");
    colorInput.val("");
    notesInput.val("");
    $("#file-input").val("");

    console.log("This is:", formData);
    console.log("is this updating?", updating);
    // Does a post to the add route.
    // Otherwise we log any errors
    if (updating) {
      // formData.id = productId;
      formData.append("id", productId);
      updateProduct(formData);
    } else {
      addProduct(formData);
    };
  });

  function addProduct(formData) {
    $.ajax({
      url: "/api/add",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      method: 'POST',
    }).then(function (data) {
      console.log(data);
      $("#added").text("Your product has been added!")
      newATag = $('<a>')
      newATag.attr("href", "../collection")
      newATag.text(" Find it here!")
      $("#added").append(newATag);

    });
  };

  // Update a given post, bring user to the blog page when done
  function updateProduct(product) {
    console.log(product);
    $.ajax({
      method: "PUT",
      url: "/api/add/" + productId,
      data: product,
      contentType: false,
      processData: false,
      cache: false
    })
    .then(function (data) {
      // window.location.href = "/collection";
      console.log(data);
    });
    console.log("This is the product: " + product)
  };

  function handleLoginErr(err) {
    console.log(err);
    $("#alert .msg").text(err);
    $("#alert").fadeIn(500);
  };

  // Gets post data for a post if we're editing
  function getProductData(id) {
    $.get("/api/add?product_id=" + id, function (data) {
      if (data) {
        console.log(data);
        productId = data.id;
        // If this post exists, prefill our cms forms with its data
        categoryInput.val(data.category);
        brandInput.val(data.brand);
        productNameInput.val(data.product_name);
        colorInput.val(data.color);
        notesInput.val(data.notes);
        photoUrl = data.photo;

        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      };
    });
  };
});