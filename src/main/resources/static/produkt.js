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
    $.get( "/hentAlle", function( data ) {
        formaterData(data);
    });
};

function formaterData(produkter){
    var ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Id</th><th>Navn</th><th>Adresse</th><th>Slett</th>" +
        "</tr>";
    for(let i in produkter ){
        ut+="<tr><td>"+produkter[i].id+"</td><td>"+produkter[i].navn+"</td><td>"+produkter[i].beskrivelse+"</td><td>"+ "<button onclick='slettProdukt(" + produkter[i].id + ")' class='btn btn-danger'>Slett</button>"+ "</td></tr>"
    }
    $("#produktene").html(ut);
}


function slettProdukt(id) {
    $.ajax({
        url: "/slettProdukt/" + id,
        type: "DELETE",
        success: function() {
            hentAlle();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error kunne ikke slette: " + textStatus);
        }
    });
}


