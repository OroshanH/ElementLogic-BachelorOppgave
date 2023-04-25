$(function(){
    hentAlle();
});

function regProdukt() {
    if (isNaN(parseInt($("#produktid").val())) || $("#navn").val() == "" || $("#beskrivelse").val() == ""){
        showCustomDialog();
    } else {
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
               console.log('Ok');
           })
           .catch(error => {
               console.error('Error:', error);

           });

       });
       });

  $("#produktid").val("");
  $("#navn").val("");
  $("#beskrivelse").val("");
  }
};

function showCustomDialog() {
  let dialog = document.getElementById('custom-dialog');
  dialog.classList.add('show');
  setTimeout(function() {
    dialog.classList.remove('show');
  }, 1500);
}

function hentAlle() {
    $.get( "/hentAlle", function( data ) {
        formaterData(data);});
};

function formaterData(produkter){
    var ut = "<table class='table table-light table-hover font center-table'>" +
        "<tr>" +
        "<th scope='col' class='thLabel'>ProduktID</th><th scope='col' class='thLabel'>Product Name</th><th scope='col' class='thLabel'>Description</th><th scope='col' class='thLabel'>Delete Product</th>" +
        "</tr>";
    for(let i in produkter ){
        ut+="<tr><th scope='row' class='th'>"+produkter[i].produktid+"</th><td class='th'>"+produkter[i].navn+"</td><td class='thB'>"+produkter[i].beskrivelse+"</td><td>"+ "<button onclick='slettProdukt(" + produkter[i].id + ")' class='btnSlett' id='btn'>Delete</button>"+ "</td></tr>"
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
            console.log("Error: " + textStatus);
        }
    });
}

