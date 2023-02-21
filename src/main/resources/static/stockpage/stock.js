$(function(){
    hentAlleInbound();
});

function hentAlleInbound() {
    $.get( "/hentAlleInbound", function( data ) {
        formaterData(data);
    });
};



function formaterData(inboundProdukter){
    var ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>ProduktID</th><th>Navn</th><th>Beskrivelse</th><th>Antall</th>" +
        "</tr>";
    for(let i in inboundProdukter ){
        ut+="<tr><td>"+inboundProdukter[i].produktid+"</td><td>"+"N/A"+"</td><td>"+"N/A"+"</td><td>" + inboundProdukter[i].quantity + "</td> </tr>"
    }
    $("#produktene").html(ut);
}