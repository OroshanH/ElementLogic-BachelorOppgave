$(function(){
    hentAlle();
});

function hentAlle() {
  $.get( "/hentAlleInbound", function( inboundData ) {
    $.get( "/hentAlle", function( produkterData ) {
    $.get( "/hentAlleOutbound", function( outboundData ) {
    $.get( "/hentStock", function( stockData ) {
      formaterData(inboundData, produkterData, outboundData, stockData);
    });
  });
});
 });
}

 let valgtOutbound = [];


function toggleInputField(i) {
  const quantityInput = $("#quantity" + i);
  const velgButton = $("#velgButton" + i);
  if (quantityInput.prop("readonly")) {
    quantityInput.prop("readonly", false);
    quantityInput.css("opacity", "1");
    velgButton.text("Velg");
  } else {
    quantityInput.prop("readonly", true);
    quantityInput.css("opacity", "0.5");
    velgButton.text("Valgt");
  }
}
function lagreOutbound(id, i) {
 $.get("/hentAlle", function(produkter) {
  $.get("/hentConstant", function(constant){
  const existingIndex = valgtOutbound.findIndex(obj => obj.outbound.produktid === produkter[i].produktid);

  if (existingIndex !== -1) {
    valgtOutbound.splice(existingIndex, 1);
    toggleInputField(i);
  } else {
        const outbound = {
          quantity: parseInt($("#quantity" + i).val()),
          produktid: produkter[i].produktid,
          extpicklistid: constant[0].x,
          extorderid: constant[0].x,
          extorderlineid: constant[0].y,
          status: "Ikke Sendt"
        }
        valgtOutbound.push({
          outbound: outbound
        });
        toggleInputField(i);
        $.get("/hentConstant", function(constant){
          $.post("/oppdaterY", {y: constant[0].y + 1}, function(result){});
        });
      }
    });
  });
}


 function lagreValgte() {
 if (valgtOutbound.length === 0) {
     throw new Error("Ingen Produkter Valgt");
   }
     const url = "/lagreOutbound";
        toggleInputField();
        function toggleInputField() {
          const quantityInput = $(".inputReset");
          const velgButton = $(".btnVelg");

            quantityInput.prop("readonly", false);
            quantityInput.css("opacity", "1");
            velgButton.text("Velg");
            $(".inputReset").val("");

        }

     valgtOutbound.forEach(function(valgtOutbounds) {

        $.post(url, valgtOutbounds.outbound, function(resultat) {

        const produktid = valgtOutbounds.outbound.produktid;
        alert(produktid);
        oppdaterProduktStatus(produktid);

            console.log("Sendt outbound");
            valgtOutbound = [];

        });
     });
     alert("Valgte produkter er sendt");

    outboundPost();


     function outboundPost() {
      $.get("/hentConstant", function(constant){
         $.post("/oppdaterX", {x: constant[0].x + 1}, function(result){});
         });
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
 }



function formaterData(inboundData, produktData, outboundData, stockData) {
  var ut = "<table class='table table-light table-hover font center-table'>" +
    "<tr>" +
    "<th scope='col' class='thLabel'>ProduktID</th><th scope='col' class='thLabel'>Produkt Navn</th><th scope='col' class='thLabel'>Beskrivelse</th><th scope='col' class='thLabel'>Antall</th><th scope='col' class='thLabel'>Send</th><th scope='col' class='thLabel'>Status</th>" +
    "</tr>";

  for (let i in inboundData) {
    let produktIndex = produktData.findIndex(p => p.produktid === inboundData[i].produktid);
    if (produktIndex >= 0) {
      ut += "<tr><td class='th'>" + inboundData[i].produktid + "</td><td class='th'>" + produktData[produktIndex].navn + "</td><td class='thB'>" + produktData[produktIndex].beskrivelse + "</td><td class='th'>" + "<input type='number' min='1' max='"+ stockData[i].quantity +"' class='inputReset'  id='quantity" + i + "'>" + "</td>" + "<td>" + "<button id='velgButton" + i + "' onclick='lagreOutbound(" + inboundData[i].produktid + ", " + i + ")' class='btnVelg'>Velg</button>" + "</td><td>" + inboundData[i].status + "</td> </tr>";
    }
  }

  ut += "</table>";
  $("#produktene").html(ut);
}



function oppdaterProduktStatus(produktid) {
  const url = "/oppdaterStatus/" + produktid;
  $.ajax({
    url: url,
    type: "PUT",
    success: function(resultat) {location.reload();}
  });
}



