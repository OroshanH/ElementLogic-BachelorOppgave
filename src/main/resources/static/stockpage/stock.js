$(function(){
    hentAlleInbound();
});

function hentAlleInbound() {
  $.get( "/hentAlleInbound", function( inboundData ) {
    $.get( "/hentAlle", function( produkterData ) {
      formaterData(inboundData, produkterData);
    });
  });
}


function formaterData(inboundData, produkterData) {
  var ut = "<table class='table table-light table-hover font center-table'>" +
      "<tr>" +
      "<th scope='col' class=thLabel>ProduktID</th><th scope='col' class=thLabel>Navn</th><th scope='col' class=thLabel>Beskrivelse</th><th scope='col' class=thLabel>Antall</th>" +
      "</tr>";

  for (let i in inboundData) {
    for (let j in produkterData) {
      if (inboundData[i].produktid === produkterData[j].produktid) {
        ut += "<tr><td class='th'>" + inboundData[i].produktid + "</td><td class='th'>" + produkterData[j].navn + "</td><td class='thB'>" + produkterData[j].beskrivelse + "</td><td class='th'>" + inboundData[i].quantity + "</td> </tr>";
        break;
      }
    }
  }

  ut += "</table>";
  $("#produktene").html(ut);
}
