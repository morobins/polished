$('#searchsub').on('click', function (event) {
  $("form").hide();
  event.preventDefault();

  function displayResults() {

    var categoryInput = $('#category').val();
    var brandInput = $('#brand').val().trim();
    var productInput = $('#product').val().trim();
    var colorInput = $('#color').val().trim();

    // var queryURL =
    //   "/api/products?category=" + categoryInput || "&brand=" + brandInput || "&color=" + colorInput || "&product_name=" + productInput;

    var queryURL = "/api/products?";

    if (categoryInput) {
      queryURL += "category=" + categoryInput + "&";
    }

    if (brandInput) {
      queryURL += "brand=" + brandInput + "&";
    }

    if (productInput) {
      queryURL += "product_name=" + productInput + "&";
    }

    if (colorInput) {
      queryURL += "color=" + colorInput + "&";
    }

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (results) {
      console.log(results);

      for (var i = 0; i < results.length; i++) {

        var cardHolder = $(".card-columns")
        //create a div with a col class
        var cardCol = $('<div>');
        cardCol.addClass("col s4");
        cardCol.attr("data-productid", results[i].id);

        //create the card
        var card = $('<div>');
        card.addClass("card");
        card.attr("width", "24rem");

        //add image
        var cardImage = $('<img>');
        cardImage.addClass('card-img-top');
        cardImage.attr("src", results[i].photo);
        cardImage.attr("alt", "cosmetics photo");

        //create card content
        var cardContent = $('<div>');
        cardContent.addClass('card-body');

        //add Title
        var cardTitle = $('<h5>');
        cardTitle.addClass('card-title');
        cardTitle.html("Brand: " + results[i].brand)
        cardContent.prepend(cardTitle);

        //show color of selected cosmetic
        var cardColor = $('<p>');
        cardColor.html("Color: " + results[i].color);
        cardContent.append(cardColor);

        //create delete button
        var deleteBtn = $("<button>");
        deleteBtn.text("Delete");
        deleteBtn.attr("data-productid", results[i].id);
        deleteBtn.addClass("delete btn btn-outline-danger");
        cardContent.append(deleteBtn);

        //show edit button
        var editBtn = $("<a>");
        editBtn.text("Edit");
        editBtn.attr("data-productid", results[i].id);
        editBtn.attr("href", "/add?product_id=" + results[i].id);
        editBtn.addClass("edit btn btn-outline-secondary");
        cardContent.append(editBtn);

        card.append(cardImage);
        card.append(cardContent);
        cardCol.append(card);
        cardHolder.append(cardCol);
      }
    });
  };

  displayResults();

  // This function figures out which post we want to delete and then calls deletePost and reloads the page
  function handlePostDelete(productId) {
    console.log(productId);
    $.ajax({
      url: "/api/products/" + productId,
      method: "DELETE"
    }).then(function (data) {
      console.log(data);
      $("[data-productid=" + productId + "]").remove();
    })
  };

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentProduct = $(this).attr("data-productid")
    window.location.href = "/add?post_id=" + currentProduct.id;
  };

  function confirmDelete() {
    var productId = $(this).attr("data-productid");
    console.log(productId);
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((result) => {
        console.log(result);
        if (result) {
          console.log(productId);
          handlePostDelete(productId);

          swal("Poof! Your product has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your product is safe!");
        }
      });
  };

  $(document).on("click", "button.delete",
    confirmDelete);

  $(document).on("click", "button.edit", handlePostEdit);
});