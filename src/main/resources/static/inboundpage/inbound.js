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
        purchaseorderlineid: i,
        status: 0
    };
    const stock = {
        quantity : parseInt($("#quantity" + i).val()),
        produktid : id
    }
    const url = "/lagreInbound";
    const stockUrl = "/lagreStock";
    const emanagerUrl = "https://webhook.site/8d5fef78-9d35-4f53-b2f8-fccd3072f552";

    $.post(url, inbound, function(resultat){
        alert("Sendt");
         $("#quantity" + i).val("");

        $.post(stockUrl,stock,function(resultat2){
            alert("YES");
        });



        $.get("/hentAlleInbound", function(alleInbound) {
            const latestInbound = alleInbound[alleInbound.length - 1];
            const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
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

            $.ajax({
                type: "POST",
                url: emanagerUrl,
                data: xmlData,
                contentType: "application/xml; charset=utf-8",
                dataType: "xml",
                success: function(xmlResultat) {
                    alert("Sendt til eManager");
                },
                error: function(xhr, textStatus, errorThrown) {
                    alert("Sending feilet");
                }
            });
        });

    });

    /*
    const button = document.getElementById("myButton");
    button.classList.remove("btn-primary");
    button.classList.add("btn-success"); */
}


