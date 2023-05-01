$(function(){
    hentAlleInbound();
});

function hentAlleInbound() {
  $.get( "/hentStock", function( stockData ) {
    $.get( "/hentAlle", function( produkterData ) {
      formaterData(stockData, produkterData);
    });
  });
}


function formaterData(stockData, produkterData) {
  var ut = "<table class='table table-light table-hover font center-table'>" +
      "<tr>" +
      "<th scope='col' class=thLabel>ProductID</th><th scope='col' class=thLabel>Product Name</th><th scope='col' class=thLabel>Description</th><th scope='col' class=thLabel>Quantity</th><th scope='col' class=thLabel>Delete</th>" +
      "</tr>";

  for (let i in stockData) {
  var mockQuantity = stockData[i].quantity - stockData[i].quantityOut;
    for (let j in produkterData) {
      if (stockData[i].produktid === produkterData[j].produktid) {
        ut += "<tr><td class='th'>" + stockData[i].produktid + "</td><td class='th'>" + produkterData[j].navn + "</td><td class='thB'>" + produkterData[j].beskrivelse + "</td><td class='th'>" + mockQuantity + "</td><td>" + "<button onclick='slettStock(" + stockData[i].id + ", " + stockData[i].quantityOut + ")' class='btnSlett' id='btn'>Delete</button>" +  "</td> </tr>";
        break;
      }
    }
  }

  ut += "</table>";
  $("#produktene").html(ut);
}


function slettStock(id,quantityOut) {

if (quantityOut > 0) {
    alert("Cant delete stock of ordered product");
    return;
  }

    $.ajax({
        url: "/slettStock/" + id,
        type: "DELETE",
        success: function() {
            hentAlleInbound();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus);
        }
    });
}