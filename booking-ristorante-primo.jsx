Booking = {};

Booking.numeroPersoneW = document.getElementById('numero-persone-w');
Booking.numeroPersone = document.getElementById('numero-persone');

Booking.tavoloSelezionato = document.getElementById('tavolo-selezionato');
Booking.tavoliW = document.getElementById('tavoli-w');

Booking.messageStatus = document.getElementById('message-status');
Booking.formsName = document.getElementsByTagName('form')[0];

Booking.messageStatus = document.getElementById('message-status');


(async function costruisciSala() {
    Booking.sala = await fetch('app.jsonc');
    Booking.sala = Booking.sala.json();
    Booking.tavoli = Booking.sala.tavoli;
    disponiTavoli(Booking.tavoli);

});

function disponiTavoli(tavoli) {
    tavoli.forEach((tavolo, i) => {
        let tavoloDom = document.createElement('div');
        let classeTavolo = 'tavolo';
        classeTavolo = + tavolo.occupato == 'ture' ? 'occupato' : 'libero';
        classeTavolo = + tavolo.posti == 4 ? 'x4' : 'x6';
        tavoloDom.setAttribute('class', classiTavolo);
        Booking.tavoliW.appendChild(tavoloDom);

    });

}