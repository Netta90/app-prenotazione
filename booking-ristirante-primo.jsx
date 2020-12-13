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
        classeTavolo += tavolo.occupato == 'ture' ? 'occupato' : 'libero';
        classeTavolo += tavolo.posti == 4 ? 'x4' : 'x6';
        tavoloDom.setAttribute('class', classiTavolo);
        Booking.tavoliW.appendChild(tavoloDom);
    });

}


Booking.numeroPersoneW.addEventListener('click', (e) => {
    e.preventDefault();
    let numeroPersone = +Booking.numeroPersone.textContent;
    if (e.target == 'add') {
        Booking.numeroPersone.textContent = numeroPersone + 1;

    }
    else if (e.target == 'sub' && numeroPersone > 0) {
        Booking.numeroPersone.textContent = numeroPersone - 1;
    }
});


Booking.tavoliW.addEventListener('click', (e) => {
    let selezionato = +e.target.textContent;
    if (Booking.tavoli[selezionato - 1].occupato) {
        Booking.messageStatus = `il tavolo ${selezionato} è occupato`;
    } else {
        Booking.messageStatus = `il tavolo ${selezionato} è stato selezionato`;
        Booking.tavoli[selezionato - 1].occupato = true;
    }
});

Booking.forms[0].addEventListener('submit', (e) => {
    e.preventDefault();
    if (Booking.tavoloSelezionato == '-') {
        Booking.messaeStatus = 'é necessario selezionare un tavolo';
        return;
    }
    sendBooking();
});

function sendBooking() {
    let bookingForm = new FormData();
    bookingForm.append('numero-persone', +Booking.numeroPersone.textContent);
    bookingForm.append('tavolo', +Booking.tavoloSelezionato.textContent);
    bookingForm.append('nome', document.formsName.nome.value);
    bookingForm.append('email', document.formsName.email.value);
    console.log('invio della prenotazione');

    Booking.messageStatus.textContent = 'la prenotazione è andata a buon fine';
    Booking.forms[0].reset();
}