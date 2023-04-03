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
        "<th scope='col' class=thLabel>ProduktID</th><th scope='col' class=thLabel>Produkt Navn</th><th scope='col' class=thLabel>Beskrivelse</th><th scope='col' class=thLabel>Antall</th><th scope='col' class=thLabel>Send Produkt</th>" +
        "</tr>";
    for(let i in produkter ){
        ut+="<tr><td class='th'>"+produkter[i].produktid+"</td><td class='th'>"+produkter[i].navn+"</td><td class='thB'>"+produkter[i].beskrivelse+"</td><td class='thInp'>" +  "<input type='number' min='1' id='quantity" + i + "'>" + "</td>" + "<td>" + "<button id='myButton' onclick='sendProdukt(" + produkter[i].produktid +  ", " + i + ")' class='btnSend'>Send</button>" + "</td></tr>"
    }
    $("#produktene").html(ut);
}



function sendProdukt(id, i) {
    $.get("/hentConstant", function(constant) {
        const inbound = {
            quantity: parseInt($("#quantity" + i).val()),
            produktid: id,
            purchaseorderid: constant[0].z,
            purchaseorderlineid: constant[0].z,
            status: "Ikke sendt"
        };
        $.get("/hentConstant", function(constant){
                     $.post("/oppdaterZ", {z: constant[0].z + 1}, function(result){});
                     });
        const stock = {
            quantity: parseInt($("#quantity" + i).val()),
            produktid: id
        };

        const url = "/lagreInbound";
        const stockUrl = "/lagreStock";

        $.post(url, inbound, function(resultat) {

            $("#quantity" + i).val("");

            $.post(stockUrl, stock, function(resultat2) {

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
    });
}





