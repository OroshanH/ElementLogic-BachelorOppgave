$(function(){
    hentAlle();
});

function hentAlle() {
    $.get( "/hentAlle", function( data ) {
        formaterData(data);
    });
};

function formaterData(produkter){
    var ut = "<table class='table table-light table-hover font center-table'>" +
        "<tr>" +
        "<th scope='col'>ProduktID</th><th scope='col'>Navn</th><th scope='col'>Beskrivelse</th><th scope='col'>Antall</th><th scope='col'>Send</th>" +
        "</tr>";
    for(let i in produkter ){
        ut+="<tr><td>"+produkter[i].produktid+"</td><td>"+produkter[i].navn+"</td><td>"+produkter[i].beskrivelse+"</td><td>" +  "<input type='number' id='quantity" + i + "'>" + "</td>" + "<td>" + "<button id='myButton' onclick='sendProdukt(" + produkter[i].produktid + ", " + i + ")' class='btn btn-primary'>Send</button>" + "</td> </tr>"
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
    const stock = {
        quantity : parseInt($("#quantity" + i).val()),
        produktid : id
    }
    const url = "/lagreInbound";
    const stockurl = "/lagreStock";
    $.post(url, inbound, function(resultat){
        alert("Sendt til eManager");
         $("#quantity" + i).val("");
    });
    $.post(stockurl,stock,function(resultat2){
        alert("YES");
    });

    /*
    const button = document.getElementById("myButton");
    button.classList.remove("btn-primary");
    button.classList.add("btn-success"); */
}


