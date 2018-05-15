$('#addProd').on('click', function (event) {
  event.preventDefault();

  // let validate = true;

  // if ($('.name-validate').val() === '') {
  //   validate = false;
  //   $('.name-validate').addClass('is-invalid');
  //   return false;
  // } else {
  //   $('.name-validate').removeClass('is-invalid');
  // };

  // if ($('.photo-validate').val() === '') {
  //   validate = false;
  //   $('.photo-validate').addClass('is-invalid');
  //   return false;
  // } else {
  //   $('.photo-validate').removeClass('is-invalid');
  // };

  // if ($('.custom-select').val() === '') {
  //   validate = false;
  //   $('.custom-select').addClass('is-invalid');
  //   return false;
  // } else {
  //   $('.custom-select').removeClass('is-invalid');
  // };

  //grab input values from product form
  var newProduct = {
    category: $('#category').val(),
    brand: $('#brand').val().trim(),
    product_name: $('#productName').val().trim(),
    color: $('#color').val().trim(),
    notes: $('#notes').val()
  };

  $("#brand").val('');
  $("#productName").val('');
  $("#color").val('');
  $("#notes").val('');

  //POST into products
  $.post('/api/products', newProduct)
    .then(function(data) {
      console.log(data);
    })
});
