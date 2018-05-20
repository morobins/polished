$(document).ready(function () {
  /* global moment */

  function displayCards() {
    // $('.card').empty();

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
        editBtn.attr("href", "/add?product_id="+ results[i].id)
        editBtn.addClass("edit btn btn-outline-secondary btnMargin");
        cardContent.append(editBtn);

        card.append(cardImage);
        card.append(cardContent);
        cardCol.append(card);
        cardHolder.append(cardCol);
      }
     
    });

  };

  displayCards();

  // This function figures out which post we want to delete and then calls deletePost and reloads the page
  function handlePostDelete() {
    var currentProduct = $(this).attr("data-productid")
    $.ajax({
      url: "/api/products/" + currentProduct,
      method: "DELETE"
    }).then(function(data) {
      // window.location.href = "/collection"
      console.log(currentProduct);
    })
  }

  // This function figures out which post we want to edit and takes it to the appropriate url

  function handlePostEdit() {
    var currentProduct = $(this).attr("data-productid")
    $.ajax({
      url: "/api/products/" + currentProduct,
      method: "PUT"
    }).then(function(data) {
      window.location.href = "/add?post_id=" + currentProduct.id;
      console.log(data);
    })
    
  }

  
  $(document).on("click", "button.delete", handlePostDelete);

  $(document).on("click", "button.edit", handlePostEdit);

});