"use strict";
(function(){

buildTables();
buildMenu();
// getOrderTickets();

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
                // var tbodyEl = $('tbody');

                // tbodyEl.html('');

                finalResponse.forEach(function(table) {
                    // $('#table-dropdown').append(
                    //   '<option value="' + table.id + '">' + table.number + '</option>');
                    //
                    $('#tableList').append('\
                          <tr>\
                            <td class="id">' + table.number + '</td>\
                            <td>\
                                <button class="new-ticket">New Ticket</button>\
                                <button class="view-tickets">View Tickets</button>\
                                <button class="update-button">UPDATE/PUT</button>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
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
                // var tbodyEl = $('tbody');

                // tbodyEl.html('');

                finalItems.forEach(function(item) {
                    $('#menuItems').append('\
                          <tr>\
                            <td class="id">' + item.name + '- $' + item.price + '</td>\
                        </tr>\
                    ');
                });
            }
        });
    }




    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInput = $('#create-input');

        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: function(response) {
                console.log(response);
                createInput.val('');
                $('#get-button').click();
            }
        });
    });

    // CREATE NEW ORDER TICKET
    // need to pull table id
    $('table').on('click', '.view-tickets', function getOrderTickets() {
      console.log("FOOD");

              $.ajax({
                  url: 'https://check-api.herokuapp.com/checks/:id',
                  contentType: 'application/json',
                  type: 'GET',
                  headers: {
                    "Content-Type":"application/json",
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlNTc2MzhmLWI0YWItNDhmZS1hNjdlLTYwMzNiNjkwMWRiZiIsIm5hbWUiOiJNZWhyaSJ9.qMKQh_xECSDEsRrZMzkWmbr3WKtfbSKF7a8xDxBvxYM"
                  },
                  success: function(response) {
                    console.log(JSON.parse(response));
                      var getTickets = JSON.parse(response);
                      // var tbodyEl = $('tbody');

                      // tbodyEl.html('');

                      getTickets.forEach(function(check) {
                          $('#ticketOrders').append(
                                '<tr>' +
                                  '<td class="id">' +
                                  'Table: ' +
                                  check.tableId +
                                  '</td>' +
                              '</tr>'
                          );
                      });
                  }
              });
          }
    );




// End of code
})();
