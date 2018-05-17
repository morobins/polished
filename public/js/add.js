$(document).ready(function () {
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

    if ($("#file-input").prop("files")[0], $("#file-input").prop("files")[0]) {
      // append photo information to form (photo: {objOfPhotoInfo})
      formData.append("photo", $("#file-input").prop("files")[0], $("#file-input").prop("files")[0].name);
    }
    console.log($("#file-input").prop("files"));

    addProduct(formData);
    categoryInput.val("Select a Category");
    brandInput.val("");
    productNameInput.val("");
    colorInput.val("");
    notesInput.val("");
    $("#file-input").val("");
  });

  // Does a post to the add route.
  // Otherwise we log any errors
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
    });
  }

  function handleLoginErr(err) {
    console.log(err);
    $("#alert .msg").text(err);
    $("#alert").fadeIn(500);
  }
});