$('#searchsub').on('click', function (event) {

  $("form").hide();

  event.preventDefault();

  function displayResults() {

    var categoryInput = $('#category').val();
    var brandInput = $('#brand').val().trim();
    var productInput = $('#product').val().trim();
    var colorInput = $('#color').val().trim();

    var queryURL =
      "/api/products?category=" + categoryInput || "&brand=" + brandInput || "&color=" + colorInput || "&product_name=" + productInput;

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (results) {
      // res.json(results);
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
        deleteBtn.attr("data-toggle", "modal");
        deleteBtn.attr("data-target", "#myModal");
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

  }

  displayResults();

  // This function figures out which post we want to delete and then calls deletePost and reloads the page
  function handlePostDelete() {
    var currentProduct = $(this).attr("data-productid")
    $.ajax({
      url: "/api/products/" + currentProduct,
      method: "DELETE"
    }).then(function (data) {
      $('#deleteModal').modal('toggle');
      $('#success').text("You're Product Has Been Deleted!");
      $('#collectionLink').text("Click Here to See Your updated Collection");
      console.log(data);
    })
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentProduct = $(this).attr("data-productid")

    window.location.href = "/add?post_id=" + currentProduct.id;
  };

  function confirmDelete() {
    var yes = confirm("Are you sure you want to delete?");
    if (yes) {
      handlePostDelete();
    }
    else {
      return false;
    }
  
  // popup with option to delete or not delete
  // if selection === true {
  // handlePostDelete();
  // else
  // go back to search page
  }

  $(document).on("click", "button.delete", confirmDelete);

 
  

  $(document).on("click", "button.edit", handlePostEdit);

});