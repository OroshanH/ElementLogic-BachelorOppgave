$(function(){
    hentAlle();
});

function regProdukt() {

  const produkt = {
    produktid: parseInt($("#produktid").val()),
    navn: $("#navn").val(),
    beskrivelse: $("#beskrivelse").val()
  };

  const url = "/lagre";
  $.post(url, produkt, function(resultat) {
    hentAlle();

    const xmlUrl = "https://webhook.site/8d5fef78-9d35-4f53-b2f8-fccd3072f552";

    $.get("/hentAlle", function(alleProdukter) {
      const latestProdukt = alleProdukter[alleProdukter.length - 1];
      const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
        <ImportOperation>
          <Lines>
            <ProductLine>
              <TransactionId>${latestProdukt.id}</TransactionId>
              <ExtProductId>${produkt.produktid}</ExtProductId>
              <ProductName>${produkt.navn}</ProductName>
              <ProductDesc>${produkt.beskrivelse}</ProductDesc>
            </ProductLine>
          </Lines>
        </ImportOperation>`;

      $.ajax({
        type: "POST",
        url: xmlUrl,
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
        "<th scope='col'>ProduktID</th><th scope='col'>Navn</th><th scope='col'>Beskrivelse</th><th scope='col'>Slett</th>" +
        "</tr>";
    for(let i in produkter ){
        ut+="<tr><th scope='row'>"+produkter[i].produktid+"</th><td>"+produkter[i].navn+"</td><td>"+produkter[i].beskrivelse+"</td><td>"+ "<button onclick='slettProdukt(" + produkter[i].id + ")' class='btn btn-danger'>Slett</button>"+ "</td></tr>"
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
