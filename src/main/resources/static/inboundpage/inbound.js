$(function(){
    hentProdukter();
});

function hentProdukter() {
    $.get( "/hentAlle", function( data ) {
    $.get( "/hentAlleInbound", function( inboundData ) {
        populateProductSelect(data);
        formaterData(inboundData);
    });
    });
};

function populateProductSelect(produkter) {

    var select = $("#product-select");
    for(let i in produkter ){
        select.append(`<option value="${produkter[i].produktid}">${produkter[i].navn}</option>`);
    }
    select.prop("disabled", false);
}

$(document).ready(function() {
  console.log("test");
  $("#product-select").on("change", function() {
    console.log("Product selected");
    var productId = $(this).val();
    if (productId === "") {
      $("#quantity-input").prop("disabled", true);
      $("#send-button").prop("disabled", true);
    } else {
      $("#quantity-input").prop("disabled", false);
      $("#send-button").prop("disabled", false);
      $("#quantity-input").val("");
    }
  });

  $("#send-button").on("click", function() {
    var productId = $("#product-select").val();
    var quantity = parseInt($("#quantity-input").val());
    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
    sendProdukt(productId, quantity);
  });
});





function sendProdukt(productId, quantity) {

    $.get("/hentConstant", function(constant) {
        const inbound = {
            quantity: quantity,
            produktid: productId,
            purchaseorderid: constant[0].z,
            purchaseorderlineid: constant[0].z,
            status: "Ikke sendt"
        };
        $.get("/hentConstant", function(constant){
                     $.post("/oppdaterZ", {z: constant[0].z + 1}, function(result){});
                     });
        const stock = {
            quantity: quantity,
            produktid: productId
        };

        const url = "/lagreInbound";

        $.post(url, inbound, function(resultat) {


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
                    console.log('Ok');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        });
    });
}


function formaterData(inboundData) {
  var ut = "<table class='table table-light table-hover font center-table'>" +
    "<tr>" +
    "<th scope='col' class='thLabel'>ProduktID</th><th scope='col' class='thLabel'>Purchaseorderid</th><th scope='col' class='thLabel'>Purchaseorderlineid</th><th scope='col' class='thLabel'>Antall</th><th scope='col' class='thLabel'>Status</th></tr>";

  for (let i in inboundData) {
      ut += "<tr><td class='th'>" + inboundData[i].produktid + "</td><td class='th'>" + inboundData[i].purchaseorderid + "</td><td class='th'>" + inboundData[i].purchaseorderlineid + "</td>" + "<td class=th>" + inboundData[i].quantity + "</td> <td class='th'>" + inboundData[i].status + "</td></tr>";
  }

  ut += "</table>";
  $("#produktene").html(ut);
}














function showCustomDialog() {
  let dialog = document.getElementById('custom-dialog');
  dialog.classList.add('show');
  setTimeout(function() {
    dialog.classList.remove('show');
  }, 1500);
}

