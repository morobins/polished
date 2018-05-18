$('#searchsub').on('click', function (event) {

  $("form").hide();
 

  event.preventDefault();
  $("form").hide();

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
      deleteBtn.addClass("delete btn btn-outline-danger");
      cardContent.append(deleteBtn);

      //show edit button
      var editBtn = $("<button>");
      editBtn.text("Edit");
      editBtn.attr("data-productid", results[i].id)
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
});