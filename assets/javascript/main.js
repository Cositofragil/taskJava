let tarjetaPadre = document.getElementById("idTarjetaPadre")
//console.log(tarjetaPadre)
let input = document.querySelector('input')

let divcategorias = document.getElementById("tarjetaCheckbox")

let eventsObjeto;
let eventsArray;
const obternerEvento = async()=>{
    try {
        const respuesta =await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        eventsObjeto = await respuesta.json()
        console.log(eventsObjeto);
        eventsArray = eventsObjeto.events
        console.log(eventsArray);
        crearCards(eventsObjeto.events)
        crearCheckboxes(eventsObjeto.events)
    } catch (error) {
        console.log(error);
        alert('error')
    }
}
obternerEvento();




input.addEventListener('input', filtro)

divcategorias.addEventListener('change', filtro)



function crearCards(array){
    if (array.length == 0){
        tarjetaPadre.innerHTML = "<p>No se encontraron resultados<p/>"
        return
    }
    let template = ""
    array.forEach(event=> {
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
                            <a href="./details.html?_id=${event._id}" class="btn btn-success d-block">Ver más...</a>
                        </div>
                    </div>
                </div>
            </div>`
    })
    tarjetaPadre.innerHTML = template;
}
//console.log(template)



//


// for (let event of data.events){
//     categorias.push(event.category)
//     }

    //function categoriasF(array, propiedad){
    //let todasCategorias= []
    //for (let i= 0; i <array.length; i++){
     //   todasCategorias.push(array[i][propiedad])
    //}
    //return todasCategorias;
//}

//let cate = categoriasF(data.events,"category")
// console.log(categorias);
function crearCheckboxes(array){
    let template2 = ""
    let categorias = array.map(event => event.category)
    let categoriasF = new Set(categorias.sort((a,b) =>{
        if(a>b){
            return 1
        }
        if(a<b){
            return -1
        }
        return 0
    }))
    categoriasF.forEach(event => {
        //console.log(event)
        template2 += `
        <div id="tarjetaCheckbox" class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="${event}" value="${event}" name="checkbox">
                <label class="form-check-label" for="${event}">${event}</label>
        </div>`
    })
    divcategorias.innerHTML = template2;
}

function fPorText(array, texto){
    let arrayF = array.filter(event => event.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayF
}

function fPorCategory(array){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let checksChecked = arrayChecks.filter(check => check.checked)
    if(checksChecked.length == 0){
        return array
    }
    let checksValues = checksChecked.map(check => check.value)
    let arrayFiltrado = array.filter(event => checksValues.includes(event.category))
    return arrayFiltrado
}

function filtro(){
    let arrayF1 = fPorText(eventsObjeto.events, input.value)
    let arrayF2 = fPorCategory(arrayF1)
    crearCards(arrayF2)
}