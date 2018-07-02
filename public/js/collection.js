$(document).ready(function () {
  /* global moment */
  function displayCards() {
    $.ajax({
      url: "/api/products",
      method: 'GET',
    }).then(function (results) {
      console.log(results);

      for (var i = 0; i < results.length; i++) {

        // console.log(response.hits[i])
        var cardHolder = $(".card-columns")
        //create a div with a col class
        var cardCol = $('<div>');
        cardCol.addClass("col s4");
        cardCol.attr("data-productid", results[i].id);

        //create the card
        var card = $('<div>');
        card.addClass("card");
        card.attr("width", "18rem");

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
        deleteBtn.attr("data-productid", results[i].id)
        deleteBtn.addClass("delete btn btn-outline-danger btnMargin");
        cardContent.append(deleteBtn);

        //show edit button
        var editBtn = $("<a>");
        editBtn.text("Edit");
        editBtn.attr("data-productid", results[i].id)
        editBtn.attr("href", "/add?product_id=" + results[i].id)
        editBtn.addClass("edit btn btn-outline-secondary btnMargin");
        cardContent.append(editBtn);

        card.append(cardImage);
        card.append(cardContent);
        cardCol.append(card);
        cardHolder.append(cardCol);
      };
    });
  };

  displayCards();

  // This function figures out which post we want to delete and then calls deletePost and reloads the page
  function handlePostDelete(productId) {
    console.log(productId);
    $.ajax({
      url: "/api/products/" + productId,
      method: "DELETE"
    }).then(function (data) {
      console.log(data);
      $("[data-productid=" + productId + "]").remove();
    });
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
        console.log("This is the result: ", result);
        if (result) {

          console.log(productId);
          handlePostDelete(productId);

          swal("Poof! Your product has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your product is safe!");
        };
      });
  };

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentProduct = $(this).attr("data-productid")
    $.ajax({
      url: "/api/products/" + currentProduct,
      method: "PUT"
    }).then(function (data) {
      window.location.href = "/add?post_id=" + currentProduct.id;
      console.log(data);
    });
  };

  $(document).on("click", "button.delete", confirmDelete);

  $(document).on("click", "button.edit", handlePostEdit);
});