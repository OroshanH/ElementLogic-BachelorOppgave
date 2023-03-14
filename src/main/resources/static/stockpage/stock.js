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


function formaterData(stockData , produkterData){
    var ut = "<table class='table table-light table-hover font center-table'>" +
        "<tr>" +
        "<th scope='col'>ProduktID</th><th scope='col'>Navn</th><th scope='col'>Beskrivelse</th><th scope='col'>Antall</th>" +
        "</tr>";
    for(let i in stockData ){
        ut+="<tr><td>"+ stockData[i].produktid + "</td><td>"+ produkterData[i].navn +"</td><td>"+ produkterData[i].beskrivelse +"</td><td>" + stockData[i].quantity + "</td> </tr>"
    }
    $("#produktene").html(ut);
}