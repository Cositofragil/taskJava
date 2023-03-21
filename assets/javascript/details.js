let urlAPi = 'https://mindhub-xj03.onrender.com/api/amazing'

let eventsObjeto;
let eventsArray;
const obtenerEvento = async()=>{
    try {
        const respuesta =await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        eventsObjeto = await respuesta.json()
        console.log(eventsObjeto);
        eventsArray = eventsObjeto.events[0].name
        console.log(eventsArray);
        const eventos = eventsObjeto.events.find(evento => evento._id == eventId)
        console.log(eventos);
        cardsDetails(eventos)
    } catch (error) {
        console.log(error);
        alert('error')
    }
}
obtenerEvento();

const eventId = new URLSearchParams(window.location.search).get("_id")

function cardsDetails(evento) {
    try{
        // const eventos = eventsObjeto.events.find(evento => evento._id == eventId)
        idDetails.innerHTML = `
            <div class="col-xs-12 col-sm-12 col-lg-5 bg-success-subtle p-2 text-dark">
                <img src="${evento.image}" class="card-img-detail" alt="...">
            </div>
            <div class="col-xs-12 col-sm-12 col-lg-5 bg-success-subtle p-3 text-dark flex-column align-items-center justify-content-between">
                <h5 class="card-title">${evento.name}</h5>
                <div class="mt-3 mb-2">
                    <span class="card-date m-1"><i class="fa fa-calendar" aria-hidden="true"></i>${evento.date}</span>
                    <span class="card-price m-1"><i class="fa fa-usd" aria-hidden="true"></i>${evento.price}</span>
                </div>
                <div class="mt-3 mb-2">
                    <span class="card-place m-1"><i class="bi bi-geo-alt" aria-hidden="true"></i>${evento.place}</span>
                    <span class="card-assistance m-1"><i class="bi bi-people-fill" aria-hidden="true"></i>${evento.assistance}</span>
                </div>
                <div class="mt-3 mb-5">
                    <span class="card-category">${evento.category}</span>
                    <span class="card-capacity"><i class="fa fa-users" aria-hidden="true"></i>${evento.capacity}</span>
                </div>
                <p class="card-text mt-3">${evento.description}</p>
            </div>`
    } catch (error){
        console.log(error);
    }
}





