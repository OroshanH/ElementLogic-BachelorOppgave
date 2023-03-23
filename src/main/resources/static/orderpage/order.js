$(function(){
    hentAlle();
});

function hentAlle() {
    $.get( "/hentAlle", function( data ) {
        formaterData(data);
    });
};

 let valgtOutbound = [];
 var x = 1;
 var extorderlineid = 0;

function lagreOutbound(id, i){
 $.get( "/hentAlle", function( produkter ) {


 const outbound = {
 quantity: parseInt($("#quantity" + i).val()),
 produktid: produkter[i].produktid,
 extpicklistid: x,
 extorderid: x,
 extorderlineid: extorderlineid,
 status: "sendt"
 }

 valgtOutbound.push({outbound: outbound});
  $("#quantity" + i).val("");
 });
extorderlineid++;
 }

 function lagreValgte() {
     const url = "/lagreOutbound";

     valgtOutbound.forEach(function(valgtOutbounds) {
        $.post(url, valgtOutbounds.outbound, function(resultat) {
            console.log("Sendt outbound");
            valgtOutbound = [];
        });
     });
     alert("Valgte produkter er sendt");
    outboundPost();

     function outboundPost() {
       const url = "/outboundPost";
     let xmlPayload = '<?xml version="1.0" encoding="UTF-8"?>';
     xmlPayload += '\n<ImportOperation>';
     xmlPayload += '\n  <Lines>';
     valgtOutbound.forEach(function(valgtOutbounds) {
       xmlPayload += '\n    <PicklistLine>';
       xmlPayload += '\n      <TransactionId>' + valgtOutbounds.outbound.extpicklistid + '</TransactionId>';
       xmlPayload += '\n      <ExtPicklistId>' + valgtOutbounds.outbound.extpicklistid + '</ExtPicklistId>';
       xmlPayload += '\n      <ExtOrderId>' + valgtOutbounds.outbound.extpicklistid + '</ExtOrderId>';
       xmlPayload += '\n      <ExtOrderlineId>' + valgtOutbounds.outbound.extorderlineid + '</ExtOrderlineId>';
       xmlPayload += '\n      <ExtProductId>' + valgtOutbounds.outbound.produktid + '</ExtProductId>';
       xmlPayload += '\n      <Quantity>' + valgtOutbounds.outbound.quantity + '</Quantity>';
       xmlPayload += '\n    </PicklistLine>';
     });
     xmlPayload += '\n  </Lines>';
     xmlPayload += '\n</ImportOperation>';


           fetch('/outboundPost', {
                              method: 'POST',
                              headers: {
                                  'Content-Type': 'application/xml'
                              },
                              body: xmlPayload
                          })
                          .then(response => {
                              console.log('Function called successfully.');
                          })
                          .catch(error => {
                              console.error('Error calling function:', error);
                          });
     }
     x++;
 }


function formaterData(produkter){
    var ut = "<table class='table table-light table-hover font center-table'>" +
        "<tr>" +
        "<th scope='col'>ProduktID</th><th scope='col'>Navn</th><th scope='col'>Beskrivelse</th><th scope='col'>Antall</th><th scope='col'>Send</th>" +
        "</tr>";
    for(let i in produkter ){
        ut+="<tr><td>"+produkter[i].produktid+"</td><td>"+produkter[i].navn+"</td><td>"+produkter[i].beskrivelse+"</td><td>" +  "<input type='number' min='0' id='quantity" + i + "'>" + "</td>" + "<td>" + "<button id='myButton' onclick='lagreOutbound(" + produkter[i].produktid + ", " + i + ")' class='btn btn-primary'>Velg</button>" + "</td> </tr>"
    }
    $("#produktene").html(ut);
}
