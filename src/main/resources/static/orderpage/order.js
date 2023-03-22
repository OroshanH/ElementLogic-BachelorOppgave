$(function(){
    hentAlle();
});

function hentAlle() {
    $.get( "/hentAlle", function( data ) {
        formaterData(data);
    });
};

function lagreOutbond(){
const outbond = {
quantity: 5,
produktid: 5,
extpicklistid: "23",
extorderid: "23",
extorderlineid: 5,
status: "sendt"
}
const url = "/lagreOutbond";
$.post(url,outbond,function(resultat){
alert("test");
})
}
function formaterData(produkter){
    var ut = "<table class='table table-light table-hover font center-table'>" +
        "<tr>" +
        "<th scope='col'>ProduktID</th><th scope='col'>Navn</th><th scope='col'>Beskrivelse</th><th scope='col'>Antall</th><th scope='col'>Hent</th><th scope='col'>Status</th>" +
        "</tr>";
    for(let i in produkter ){
        ut+="<tr><td>"+produkter[i].produktid+"</td><td>"+produkter[i].navn+"</td><td>"+produkter[i].beskrivelse+"</td><td>" +  "<input type='number' min='0'>" + "</td>" + "<td>" + "<input type='checkbox'> " + "</td>" +  "<td>" + "</td> </tr>"
    }
    $("#produktene").html(ut);
}
/*
const button = $("#myButton");
button.classList.remove("btn-primary");
button.classList.add("btn-info"); */