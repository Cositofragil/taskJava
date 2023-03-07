let tarjetaPadre = document.getElementById("idTarjetaPadre")
//console.log(tarjetaPadre)


let eventsF = []
for(let event of data.events){
    if(data.currentDate < event.date){
        // console.log(event)
        eventsF.push(event)
    }
}
//console.log(eventsF)

let template = ""
for (const event of eventsF) {
    template += `
        <div class="tarjeta col-xs-12 col-sm-6 col-md-3 col-lg-3 m-10">
            <img src="${event.image}" class="card-img rounded-top " alt="${event.category}">
            <div class="card-body bg-success-subtle border-1 p-3 text-dark rounded-bottom mb-4">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <div class="row">
                    <div class="col-6">
                        <span class="card-price"><i class="fa fa-usd" aria-hidden="true"></i>${event.price}</span>
                    </div>
                    <div class="col-6">
                        <a href="${event._id}" class="btn btn-success d-block">Ver más...</a>
                    </div>
                </div>
            </div>
        </div>`
}
// console.log(template)

tarjetaPadre.innerHTML = template;