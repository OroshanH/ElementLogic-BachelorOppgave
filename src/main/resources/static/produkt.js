$(function(){  // kjøres når dokumentet er ferdig lastet
    hentAlle();
});

function regProdukt() {
    const produkt = {
        navn : $("#navn").val(),
        beskrivelse : $("#beskrivelse").val()
    };
    const url = "/lagre";
    $.post(url, produkt, function(resultat){
        hentAlle();
    });
    $("#navn").val(""); //tøm input-feltene
    $("#beskrivelse").val("");
};

function hentAlle() {
    alert("test");
    $.get( "/hentAlle", function( data ) {
        formaterData(data);
    });
};

function formaterData(produkter){
    var ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Navn</th><th>Adresse</th>" +
        "</tr>";
    for(let i in produkter ){
        ut+="<tr><td>"+produkter[i].navn+"</td><td>"+produkter[i].beskrivelse+"</td></tr>"
    }
    $("#produktene").html(ut);
}

function slettProdukt() {
    $.get( "/slettAlle", function( data ) {
        hentAlle();
    });
};