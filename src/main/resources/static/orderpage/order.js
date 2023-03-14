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
        "<th scope='col'>ProduktID</th><th scope='col'>Navn</th><th scope='col'>Beskrivelse</th><th scope='col'>Antall</th><th scope='col'>Hent</th><th scope='col'>Status</th>" +
        "</tr>";
    for(let i in produkter ){
        ut+="<tr><td>"+produkter[i].produktid+"</td><td>"+produkter[i].navn+"</td><td>"+produkter[i].beskrivelse+"</td><td>" +  "<input type='number'>" + "</td>" + "<td>" + "<button id='myButton' class='btn btn-primary'>Hent</button>" + "</td>" +  "<td>" + "</td> </tr>"
    }
    $("#produktene").html(ut);
}
/*
const button = $("#myButton");
button.classList.remove("btn-primary");
button.classList.add("btn-info"); */