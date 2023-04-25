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
      "<th scope='col' class=thLabel>ProduktID</th><th scope='col' class=thLabel>Product Name</th><th scope='col' class=thLabel>Description</th><th scope='col' class=thLabel>Quantity</th>" +
      "</tr>";

  for (let i in stockData) {
    for (let j in produkterData) {
      if (stockData[i].produktid === produkterData[j].produktid) {
        ut += "<tr><td class='th'>" + stockData[i].produktid + "</td><td class='th'>" + produkterData[j].navn + "</td><td class='thB'>" + produkterData[j].beskrivelse + "</td><td class='th'>" + stockData[i].quantity + "</td> </tr>";
        break;
      }
    }
  }

  ut += "</table>";
  $("#produktene").html(ut);
}
