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


function formaterData(inboundData , produkterData){
    var ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>ProduktID</th><th>Navn</th><th>Beskrivelse</th><th>Antall</th>" +
        "</tr>";
    for(let i in inboundData ){
        ut+="<tr><td>"+ inboundData[i].produktid + "</td><td>"+ produkterData[i].navn +"</td><td>"+ produkterData[i].beskrivelse +"</td><td>" + inboundData[i].quantity + "</td> </tr>"
    }
    $("#produktene").html(ut);
}