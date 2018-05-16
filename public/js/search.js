$('#searchsub').on('click', function (event) {
  event.preventDefault();

  var categoryInput = $('#category').val;
  var brandInput = $('#brand').val().trim();
  var productInput = $('#product').val().trim();
  var colorInput = $('#color').val().trim();

  var queryURL =
    "/api/products?category=" + categoryInput + "&brand=" + brandInput + "&color=" + colorInput + "&product_name=" + productInput;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (results) {
    res.json(results);
    console.log(results);
  });
});