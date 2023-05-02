$(function(){
    hentAlle();
});

function hentAlle() {
  $.get( "/hentAlleOutboundMock", function( outboundDataMock ) {
    $.get( "/hentAlle", function( produkterData ) {
    $.get( "/hentAlleOutbound", function( outboundData ) {
    $.get( "/hentStock", function( stockData ) {
      formaterData(outboundDataMock, produkterData, outboundData, stockData);
      formaterDataFerdig(outboundData);
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
    velgButton.text("Select");
    velgButton.css("background-color", "");
    velgButton.css("border-color", "");
  } else {
    quantityInput.prop("readonly", true);
    quantityInput.css("opacity", "0.5");
    velgButton.text("Selected");
    velgButton.css("background-color", "green");
    velgButton.css("border-color", "green");
  }
}

function lagreOutbound(id, i) {
 if (isNaN(parseInt($("#quantity" + i).val()))){
  showCustomDialog("Invalid Quantity");
  return false;
  }

 $.get("/hentAlle", function(produkter) {
  $.get("/hentConstant", function(constant){
  const existingIndex = valgtOutbound.findIndex(obj => obj.outbound.produktid === id);

  if (existingIndex !== -1) {
    valgtOutbound.splice(existingIndex, 1);
    toggleInputField(i);
  } else {
        const outbound = {
          quantity: parseInt($("#quantity" + i).val()),
          produktid: id,
          extpicklistid: constant[0].x,
          extorderid: constant[0].x,
          extorderlineid: constant[0].y,
          status: "Work in Progress"
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
     showCustomDialog("No products chosen");
   }


     const url = "/lagreOutbound";
        toggleInputField();
        function toggleInputField() {
          const quantityInput = $(".inputReset");
          const velgButton = $(".btnVelg");

            quantityInput.prop("readonly", false);
            quantityInput.css("opacity", "1");
            velgButton.text("Select");
            $(".inputReset").val("");

        }

     valgtOutbound.forEach(function(valgtOutbounds) {

        $.post(url, valgtOutbounds.outbound, function(resultat) {

        const produktid = valgtOutbounds.outbound.produktid;


            console.log("Sendt outbound");
            valgtOutbound = [];

        });

     });

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
                              hentAlle();
                              console.log('Success');
                          })
                          .catch(error => {
                              console.error('Error:', error);
                          });
     }
         valgtOutbound.forEach(function(valgtOutbounds) {
           const produktid = valgtOutbounds.outbound.produktid;
           const quantityOut = valgtOutbounds.outbound.quantity;


           $.ajax({
             url: "/lagreQuantityOut",
             type: "POST",
             data: { produktid: produktid, quantityOut: quantityOut },
             success: function(result) {
               console.log("Quantity saved to database for product " + produktid);
             },
             error: function(jqXHR, textStatus, errorThrown) {
               console.error("Error saving quantity to database for product " + produktid);
               console.error(errorThrown);
             }
           });
         });



 }



function formaterData(outboundDataMock, produktData, outboundData, stockData) {
  var ut = "<table class='table table-light table-hover font center-table'>" +
    "<tr>" +
    "<th scope='col' class='thLabel'>ProductID</th><th scope='col' class='thLabel'>Product Name</th><th scope='col' class='thLabel'>Description</th><th scope='col' class='thLabel'>In Stock</th><th scope='col' class='thLabel'>Quantity</th><th scope='col' class='thLabel'>Send</th>" +
    "</tr>";

  for (let i in outboundDataMock) {
    let produktIndex = produktData.findIndex(p => p.produktid === outboundDataMock[i].produktid);
    let stockIndex = stockData.findIndex(s => s.produktid === outboundDataMock[i].produktid);
    var mockQuantity = stockData[stockIndex].quantity - stockData[stockIndex].quantityOut;
    if (produktIndex >= 0 && stockIndex >= 0) {
      ut += "<tr><td class='th'>" + outboundDataMock[i].produktid + "</td><td class='th'>" + produktData[produktIndex].navn + "</td><td class='thB'>" + produktData[produktIndex].beskrivelse + "</td><td class='th'>" + mockQuantity + "</td><td class='th'>";


      if (mockQuantity === 0) {
        ut += "<input type='number' min='1' max='" + stockData[stockIndex].quantity + "' class='inputReset' id='quantity" + i + "' disabled>";
      } else {
        ut += "<input type='number' min='1' max='" + stockData[stockIndex].quantity + "' class='inputReset'  id='quantity" + i + "'>";
      }

      ut += "</td><td>" + "<button id='velgButton" + i + "' onclick='lagreOutbound(" + outboundDataMock[i].produktid + ", " + i + ")' class='btnVelg'>Select</button>" + "</td></tr>";
    }
  }

  ut += "</table>";
  $("#produktene").html(ut);
}





function formaterDataFerdig(outboundData) {
  var ut = "<table class='table table-light table-hover font center-table'>" +
    "<tr>" +
    "<th scope='col' class='thLabel'>ExtPickListID</th><th scope='col' class='thLabel thStatus'>Status</th><th scope='col' class='thLabel'>Delete</th>" +
    "</tr>";

let existingIds = {};
for (let i in outboundData) {
  let status = outboundData[i].status;
  let deleteButton = "";
  if (status === "Work in Progress") {
    deleteButton = "<button onclick='slettOutbound(" + outboundData[i].extorderid + "," + outboundData[i].extpicklistid + ")' class='btnSlett' id='btn'>Delete</button>";
  }
  let picklistId = outboundData[i].extpicklistid;
  let produktId = outboundData[i].produktid;
  let quantity = outboundData[i].quantity;
  let extorderId = outboundData[i].extorderid;
  let extorderlineid = outboundData[i].extorderlineid;
  if (!existingIds[picklistId]) {
    ut += "<tr onclick='displayRowData(" + picklistId + ")'><td class='th'><img src='arrowR.png' class='arrow'>" + picklistId + "</td> <td class='th' id=statusTh>" + status + "</td><td>" + deleteButton + "</td></tr>";
    existingIds[picklistId] = true;
  }
}

ut += "</table>";
 if(outboundData.length !== 0){
      ut += "<div class='text-center mt-4'><button id='deleteHistory' onclick='slettAlle()'>Delete History</button></div>";
  }
$("#produkteneFerdig").html(ut);

}
function displayRowData(picklistId) {
  let clickedRow = $("td:contains('" + picklistId + "')").closest("tr");

  let expandedRow = clickedRow.next(".expanded-row");
  if (expandedRow.length && expandedRow.attr("id") === picklistId + "-expanded-row") {
    expandedRow.remove();
    clickedRow.removeClass("expanded");
    clickedRow.find(".arrow").removeClass("arrow-down");
  } else {
    $.ajax({
      url: "/hentOutboundMedExtOrderlineID/" + picklistId,
      method: "GET",
      dataType: "json",
      success: function(data) {
        let expandedRow = "<table class='expanded-table'><thead><tr><th>ProductID</th><th>Quantity</th><th>ExtOrderID</th><th>ExtOrderlineID</th></tr></thead><tbody>";
        for (let i = 0; i < data.length; i++) {
          let row = data[i];
          let produktId = row.produktid;
          let quantity = row.quantity;
          let extorderId = row.extorderid;
          let extorderlineid = row.extorderlineid;
          expandedRow += "<tr><td>" + produktId + "</td><td>" + quantity + "</td><td>" + extorderId + "</td><td>" + extorderlineid + "</td></tr>";
        }
        expandedRow += "</tbody></table>";
        clickedRow.after(expandedRow).next().addClass("expanded-row").addClass("dark-table").attr("id", picklistId + "-expanded-row");
        clickedRow.addClass("expanded");
        clickedRow.find(".arrow").addClass("arrow-down");
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus + " - " + errorThrown);
      }
    });
  }
}


function showCustomDialog(message) {
  let dialog = document.getElementById('custom-dialog');
  dialog.innerText = message;
  dialog.classList.add('show');
  setTimeout(function() {
    dialog.classList.remove('show');
  }, 1500);
}


function slettOutbound(extorderid, extpicklistid) {
    $.ajax({
        url: "/slettOutbound/" + extorderid,
        type: "DELETE",
        success: function(data) {
            var quantity = data.quantity;
            var produktid = data.produktid;
            updateQuantityOut(quantity, produktid);
            hentAlle();

            $.ajax({
                url: "/slettList",
                type: "DELETE",
                data: JSON.stringify({extpicklistid: extpicklistid}),
                contentType: "application/json",
                success: function(data) {
                    console.log(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log("Error: " + textStatus);
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus);
        }
    });
}




function updateQuantityOut(quantity,produktid){
    $.ajax({
        url: "/updateQuantityOut",
        type: "POST",
        data: { quantity: quantity, produktid: produktid },
        success: function() {
            console.log("QuantityOut updated successfully");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus);
        }
    });
}

function slettAlle() {
  if (confirm("Are you sure you want to delete history?")) {
    fetch('/slettAlleOutbound', {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log('Ok');
        hentAlle();
      } else {
        console.error('Error');
      }
    })
    .catch(error => console.error(error));
  }
}