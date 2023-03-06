$(function(){
    hentAlle();
});

function hentAlle() {
    $.get( "/hentAlle", function( data ) {
        formaterData(data);
    });
};

function formaterData(produkter){
    var ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>ProduktID</th><th>Navn</th><th>Beskrivelse</th><th>Antall</th><th>Send</th>" +
        "</tr>";
    for(let i in produkter ){
        ut+="<tr><td>"+produkter[i].produktid+"</td><td>"+produkter[i].navn+"</td><td>"+produkter[i].beskrivelse+"</td><td>" +  "<input type='number' id='quantity" + i + "'>" + "</td>" + "<td>" + "<button onclick='sendProdukt(" + produkter[i].produktid + ", " + i + ")' class='btn btn-primary'>Send</button>" + "</td> </tr>"
    }
    $("#produktene").html(ut);
}

function sendProdukt(id , i) {
    const inbound = {
        quantity : parseInt($("#quantity" + i).val()),
        produktid : id,
        purchaseorderid: i,
        purchaseorderlineid: i
    };
    const url = "/lagreInbound";
    $.post(url, inbound, function(resultat){
        alert("Sendt til eManager");
         $("#quantity" + i).val("");
    });
};