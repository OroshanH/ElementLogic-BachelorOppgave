$(function(){
    hentAlle();
});

function regProdukt() {
    const produkt = {
        produktid : parseInt($("#produktid").val()),
        navn : $("#navn").val(),
        beskrivelse : $("#beskrivelse").val()
    };
    const url = "/lagre";
    $.post(url, produkt, function(resultat){
        hentAlle();
    });
    $("#produktid").val("");
    $("#navn").val("");
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
        "<th>ProduktID</th><th>Navn</th><th>Adresse</th><th>Slett</th>" +
        "</tr>";
    for(let i in produkter ){
        ut+="<tr><td>"+produkter[i].produktid+"</td><td>"+produkter[i].navn+"</td><td>"+produkter[i].beskrivelse+"</td><td>"+ "<button onclick='slettProdukt(" + produkter[i].id + ")' class='btn btn-danger'>Slett</button>"+ "</td></tr>"
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


