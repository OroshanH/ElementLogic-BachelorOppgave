$(function(){
    hentProdukter();
});

function hentProdukter() {
    $.get( "/hentAlle", function( data ) {
    $.get( "/hentAlleInboundMock", function( inboundData ) {
    $.get( "/hentAlleInbound", function( inboundDataFerdig ) {
        populateProductSelect(data);
        formaterData(inboundData,data);
        formaterDataFerdig(inboundDataFerdig,data);
    });
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
  $("#product-select").on("change", function() {
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
      showCustomDialog()
      return;
    }
    sendProdukt(productId, quantity);
    $("#product-select").val("");
    $("#quantity-input").val("");
  });
});





function sendProdukt(productId, quantity) {

    $.get("/hentConstant", function(constant) {
        const inbound = {
            quantity: quantity,
            produktid: productId,
            purchaseorderid: constant[0].z,
            purchaseorderlineid: constant[0].z,
            status: "Work in Progress"
        };
        $.get("/hentConstant", function(constant){
                     $.post("/oppdaterZ", {z: constant[0].z + 1}, function(result){});
                     });


        const url = "/lagreInboundMock";

        $.post(url, inbound, function(resultat) {

            $.get("/hentAlleInboundMock", function(alleInbound) {
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
                    location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        });
    });
}


function formaterData(inboundData,data) {
  var ut = "<table class='table table-light table-hover font center-table'>" +
    "<tr>" +
    "<th scope='col' class='thLabel'>Product Name</th><th scope='col' class='thLabel'>ProductID</th><th scope='col' class='thLabel'>Purchaseorderid</th><th scope='col' class='thLabel'>Purchaseorderlineid</th><th scope='col' class='thLabel'>Quantity</th><th scope='col' class='thLabel'>Status</th><th scope='col' class='thLabel'>Delete</th></tr>";

 var productNames = {};
 for (let i = 0; i < data.length; i++) {
   productNames[data[i].produktid] = data[i].navn;
 }

 for (let i in inboundData) {
   ut += "<tr><td class='th'>" + productNames[inboundData[i].produktid] + "</td><td class='th'>" + inboundData[i].produktid + "</td><td class='th'>" + inboundData[i].purchaseorderid + "</td><td class='th'>" + inboundData[i].purchaseorderlineid + "</td>" + "<td class=th>" + inboundData[i].quantity + "</td> <td class='th'>" + inboundData[i].status + "</td><td>" + "<button onclick='slettInbound(" + inboundData[i].id + ")' class='btnSlett' id='btn'>Delete</button>" + "</td></tr>";
 }


  ut += "</table>";
  $("#produktene").html(ut);
}

function formaterDataFerdig(inboundDataFerdig,data) {
  var ut = "<table class='table table-light table-hover font center-table'>" +
    "<tr>" +
    "<th scope='col' class='thLabel'>Product Name</th><th scope='col' class='thLabel'>ProductID</th><th scope='col' class='thLabel'>Purchaseorderid</th><th scope='col' class='thLabel'>Purchaseorderlineid</th><th scope='col' class='thLabel'>Quantity</th><th scope='col' class='thLabel'>Status</th></tr>";
 var productNames = {};
 for (let i = 0; i < data.length; i++) {
   productNames[data[i].produktid] = data[i].navn;
 }
  for (let i in inboundDataFerdig) {
      ut += "<tr><td class='th'>" + productNames[inboundDataFerdig[i].produktid] + "</td><td class='th'>" + inboundDataFerdig[i].produktid + "</td><td class='th'>" + inboundDataFerdig[i].purchaseorderid + "</td><td class='th'>" + inboundDataFerdig[i].purchaseorderlineid + "</td>" + "<td class=th>" + inboundDataFerdig[i].quantity + "</td> <td class='th'>" + inboundDataFerdig[i].status + "</td></tr>";
  }

  ut += "</table>";
  if(inboundDataFerdig.length !== 0){
      ut += "<div class='text-center mt-4'><button id='deleteHistory' onclick='slettAlle()'>Delete History</button></div>";
  }

  $("#produkteneFerdig").html(ut);
}

function slettAlle() {
  if (confirm("Are you sure you want to delete history?")) {
    fetch('/slettAlleInbound', {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log('Ok');
        hentProdukter();
      } else {
        console.error('Error');
      }
    })
    .catch(error => console.error(error));
  }
}


function slettInbound(id) {
    $.ajax({
        url: "/slettInbound/" + id,
        type: "DELETE",
        success: function() {
            hentProdukter();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus);
        }
    });
}

function showCustomDialog() {
  let dialog = document.getElementById('custom-dialog');
  dialog.classList.add('show');
  setTimeout(function() {
    dialog.classList.remove('show');
  }, 1500);
}

