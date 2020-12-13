const Booking = {};

Booking.numeroPersoneW = document.getElementById('numero-persone-w');
Booking.numeroPersone = document.getElementById('numero-persone');

Booking.tavoliW = document.getElementById('tavoli-w');
Booking.tavoloSelezionato = document.getElementById('tavolo-selezionato');

Booking.messageStatus = document.getElementById('message-status');
Booking.formsName = document.getElementsByTagName('form')[0];

(async function costruisciSala() {
    Booking.sala = await fetch('app.jsonc');
    Booking.sala = await Booking.sala.json();
    Booking.tavoli = Booking.sala.tavoli;
    disponiTavoli(Booking.tavoli);
})();

function disponiTavoli(tavoli) {
    tavoli.forEach((tavolo, i) => {
        let classiTavolo = ' tavolo ';
        let tavoloDOM = document.createElement('div');
        tavoloDOM.appendChild(document.createTextNode(i + 1));
        classiTavolo += tavolo.occupato ? 'occupato' : 'libero';
        classiTavolo += tavolo.posti == 6 ? ' x6 ' : ' x4 ';
        tavoloDOM.setAttribute('class', classiTavolo);
        Booking.tavoliW.appendChild(tavoloDOM);

    });
}

Booking.numeroPersoneW.addEventListener('click', (e) => {
    e.preventDefault();
    let numeroPersone = +Booking.numeroPersone.textContent;
    if (e.target.id == 'add') {
        Booking.numeroPersone.textContent = numeroPersone + 1;
    } else if (e.target.id == 'sub' && 0 < numeroPersone) {
        Booking.numeroPersone.textContent = numeroPersone - 1;
    }
})

Booking.tavoliW.addEventListener('click', (e)=>{
    let selezionato = +e.target.textContent;
    if(Booking.tavoli[selezionato-1].occupato) {
       Booking.messaeStatus.textContent = `il tavolo ${selezionato} è occupato`;
    }else{
        Booking.tavoloSelezionato.textContent = selezionato;
    }
}); 

Booking.formsName.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(Booking.tavoloSelezionato=='-') {
        Booking.messaeStatus = 'é necessario selezionare un tavolo';
        return;
    }
    sendBooking();
});

function sendBooking(){
    let bookingForm= new FormData();
    bookingForm.append('numero-persone', +Booking.numeroPersone.textContent);
    bookingForm.append('tavolo', +Booking.tavoloSelezionato.textContent);
    bookingForm.append('nome', document.formsName.nome.value);
    bookingForm.append('email', document.formsName.email.value);
    console.log('invio della prenotazione');
    //fetch('bookingScript',{
       // body:bookingForm,
       // method:'post'
    //});
}
Booking.messageStatus.textContent = 'la prenotazione è andata a buon fine';
Booking.formsName.reset();
