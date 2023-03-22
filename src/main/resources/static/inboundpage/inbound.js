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
        ut+="<tr><td>"+produkter[i].produktid+"</td><td>"+produkter[i].navn+"</td><td>"+produkter[i].beskrivelse+"</td><td>" +  "<input type='number' min='0' id='quantity" + i + "'>" + "</td>" + "<td>" + "<button id='myButton' onclick='sendProdukt(" + produkter[i].produktid + ", " + i + ")' class='btn btn-primary'>Send</button>" + "</td> </tr>"
    }
    $("#produktene").html(ut);
}

function sendProdukt(id , i) {
    const inbound = {
        quantity : parseInt($("#quantity" + i).val()),
        produktid : id,
        purchaseorderid: i,
        purchaseorderlineid: i,
        status: 0
    };
    const stock = {
        quantity : parseInt($("#quantity" + i).val()),
        produktid : id
    }
    const url = "/lagreInbound";
    const stockUrl = "/lagreStock";

    $.post(url, inbound, function(resultat){
        alert("Sendt");
         $("#quantity" + i).val("");

        $.post(stockUrl,stock,function(resultat2){
            alert("YES");
        });



            $.get("/hentAlleInbound", function(alleInbound) {
                       const latestInbound = alleInbound[alleInbound.length - 1];
                       const payload = `<?xml version="1.0" encoding="UTF-8"?>
                   <ImportOperation>
                     <Lines>
                       <GoodsReceivalLine>
                         <TransactionId>${latestInbound.id}</TransactionId>
                         <PurchaseOrderId>${inbound.purchaseorderid}</PurchaseOrderId>
                         <PurchaseOrderLineId>${inbound.purchaseorderlineid}</PurchaseOrderLineId>
                         <ExtProductId>${inbound.produktid}</ExtProductId>
                         <Quantity>${inbound.quantity}</Quantity>
                       </GoodsReceivalLine>
                     </Lines>
                   </ImportOperation>`;

                   fetch('/inboundPost', {
                       method: 'POST',
                       headers: {
                           'Content-Type': 'application/xml'
                       },
                       body: payload
                   })
                   .then(response => {
                       console.log('Function called successfully.');
                   })
                   .catch(error => {
                       console.error('Error calling function:', error);
                   });
               });

    });

    /*
    const button = document.getElementById("myButton");
    button.classList.remove("btn-primary");
    button.classList.add("btn-success"); */
}


