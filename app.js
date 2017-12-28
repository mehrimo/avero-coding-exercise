"use strict";
(function(){

var tableNumber = $("#table-number");
var cartItems = [];
var orderTotals = {
  subtotal: 0,
  tax: 0,
  tip: 0,
  total: 0,
};

buildTables();
buildMenu();

  function buildTables() {
      $.ajax({
        url: 'https://check-api.herokuapp.com/tables',
        contentType: 'application/json',
        type: 'GET',
        headers: {
          "Content-Type":"application/json",
          "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlNTc2MzhmLWI0YWItNDhmZS1hNjdlLTYwMzNiNjkwMWRiZiIsIm5hbWUiOiJNZWhyaSJ9.qMKQh_xECSDEsRrZMzkWmbr3WKtfbSKF7a8xDxBvxYM"
        },
        success: function(response) {
          console.log(JSON.parse(response));
            var finalResponse = JSON.parse(response);

            finalResponse.forEach(function(table) {
              $('#table-number').append('<option>' +
              table.number + '</option>');
            });

        }
    });

      $('#table-btn').on('click', function(event) {
        var table = tableNumber.val();
        event.preventDefault();
        console.log("The table number is: " + table);
      });
  }

  function buildMenu() {
      $.ajax({
          url: 'https://check-api.herokuapp.com/items',
          contentType: 'application/json',
          type: 'GET',
          headers: {
            "Content-Type":"application/json",
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlNTc2MzhmLWI0YWItNDhmZS1hNjdlLTYwMzNiNjkwMWRiZiIsIm5hbWUiOiJNZWhyaSJ9.qMKQh_xECSDEsRrZMzkWmbr3WKtfbSKF7a8xDxBvxYM"
          },
          success: function(response) {
            console.log(JSON.parse(response));
              var finalItems = JSON.parse(response);

              finalItems.forEach(function(item) {
                  $('#menu-items').append('<li>' + item.name + '- $' + item.price + '<button id="' +
                  item.id +
                  '" class="add-item btn">Add</button></li>');

                $('.add-item').on('click', function(event) {
                  event.preventDefault();
                  addToCart(item);
                  console.log(item, id);
                  });
              });
          }
      });
  }

  function addToCart(item){
    cartItems.push({
      item: item,
      id: item.id,
      quantity: 1,
    });
    drawCart(cartItems);
  }

  function drawCart(cartItems){
    var cart = $(".cartItems");
    cart.html('');
    cartItems.forEach(function(cartItem){
      cart.append(
        '<tr>'+
          '<td>' + cartItem.item.name + '</td>'+
          '<td class="right-align">' + formatCurrency(cartItem.item.price) + '</td>' +
        '</tr>'
      );
    });
    calculate();
  }

  function formatCurrency(number) {
    return '$' + number.toFixed(2);
  }

  function calculate() {
    var subtotal = cartItems.reduce(function(accumulator, cartItems){
      return accumulator + cartItems.item.price * cartItems.quantity;
    }, 0);
    var tax = subtotal * 0.08845;
    var beforeTotal = subtotal + tax;
    var tip = beforeTotal * 0.20;
    var total = beforeTotal + tip;
    orderTotals.subtotal = subtotal;
    orderTotals.tax = tax;
    orderTotals.total = total;
    orderTotals.tip = tip;
    drawOrderTotal();
  }

  function drawOrderTotal() {
    var totals = $(".orderTotals");
    totals.html('');
      totals.append(
        '<tr>' +
          '<td class="right-align" data-field="subtotal">Subtotal</td>' +
          '<td class="subtotal right-align">' + formatCurrency(orderTotals.subtotal) + '</td>'+
        '</tr>' +
          '<td class="right-align" data-field="tip">Tip</td>' +
          '<td class="tip right-align">' + formatCurrency(orderTotals.tip) + '</td>' +
        '<tr>' +
          '<td class="right-align" data-field="tax">Tax</td>' +
          '<td class="tax right-align">' + formatCurrency(orderTotals.tax) + '</td>' +
        '<tr>' +
          '<td class="right-align" data-field="total">Total</td>' +
          '<td class="tax right-align">' + formatCurrency(orderTotals.total) + '</td>' +
        '</tr>'
      );
    }

})();
