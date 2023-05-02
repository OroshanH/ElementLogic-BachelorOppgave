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
        ut += "<tr><td class='th'>" + stockData[i].produktid + "</td><td class='th'>" + produkterData[j].navn + "</td><td class='thB'>" + produkterData[j].beskrivelse + "</td><td class='th'>" + mockQuantity + "</td><td>" + "<button onclick='slettStock(" + stockData[i].produktid + ", " + stockData[i].quantityOut + ")' class='btnSlett' id='deleteHistory'>Delete</button>" +  "</td> </tr>";
        break;
      }
    }
  }

  ut += "</table>";
  $("#produktene").html(ut);
}


function slettStock(produktid,quantityOut) {

if (quantityOut > 0) {
    showCustomDialog("Cant delete product which has been ordered");
    return;
  }

    $.ajax({
        url: "/slettStock/" + produktid,
        type: "DELETE",
        success: function() {
            hentAlleInbound();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus);
        }
    });
}

function showCustomDialog(message) {
  let dialog = document.getElementById('custom-dialog');
  dialog.innerText = message;
  dialog.classList.add('show');
  setTimeout(function() {
    dialog.classList.remove('show');
  }, 1800);
}