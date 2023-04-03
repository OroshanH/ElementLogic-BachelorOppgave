$(function(){
    hentAlle();
});

function regProdukt() {

  const produkt = {
    produktid: parseInt($("#produktid").val()),
    navn: $("#navn").val(),
    beskrivelse: $("#beskrivelse").val(),
  };

  const url = "/lagre";
  $.post(url, produkt, function(resultat) {
    hentAlle();

       $.get("/hentAlle", function(alleProdukter) {
           const latestProdukt = alleProdukter[alleProdukter.length - 1];
           const payload = `<ImportOperation>
               <Lines>
                   <ProductLine>
                       <TransactionId>${latestProdukt.id}</TransactionId>
                       <ExtProductId>${produkt.produktid}</ExtProductId>
                       <ProductName>${produkt.navn}</ProductName>
                       <ProductDesc>${produkt.beskrivelse}</ProductDesc>
                   </ProductLine>
               </Lines>
           </ImportOperation>`;

           fetch('/produktPost', {
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

  $("#produktid").val("");
  $("#navn").val("");
  $("#beskrivelse").val("");
};



function hentAlle() {
    $.get( "/hentAlle", function( data ) {
        formaterData(data);});
};

function formaterData(produkter){
    var ut = "<table class='table table-light table-hover font center-table'>" +
        "<tr>" +
        "<th scope='col' class='thLabel'>ProduktID</th><th scope='col' class='thLabel'>Produkt Navn</th><th scope='col' class='thLabel'>Beskrivelse</th><th scope='col' class='thLabel'>Slett Produkt</th>" +
        "</tr>";
    for(let i in produkter ){
        ut+="<tr><th scope='row' class='th'>"+produkter[i].produktid+"</th><td class='th'>"+produkter[i].navn+"</td><td class='thB'>"+produkter[i].beskrivelse+"</td><td>"+ "<button onclick='slettProdukt(" + produkter[i].id + ")' class='btnSlett'>Slett</button>"+ "</td></tr>"
    }
    $("#produktene").html(ut);
}


function slettProdukt(id) {
    $.ajax({
        url: "/slettProdukt/" + id,
        type: "DELETE",
        success: function() {
            hentAlle();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error kunne ikke slette: " + textStatus);
        }
    });
}

