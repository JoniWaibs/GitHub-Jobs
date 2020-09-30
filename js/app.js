console.log('todo ok')
const Formulario = document.querySelector('#formulario');
const Search = document.querySelector('#busqueda');
const Result = document.querySelector('#resultado');


eventListeners()
function eventListeners(){
    Formulario.addEventListener('submit', dataRead)
};


//Funcion que lee y valida los datos ingresados en el form
function dataRead(e){
    e.preventDefault()
    const clave = Search.value
    console.log()
    if(clave === '' || clave.length < 2){
        //Alerta
        showAlert('Debes ingresar informacion en tu busqueda')
        return;
    }
    //query API
    queryApi(clave);
};
//Funcion alerta
function showAlert(msj){
    Swal.fire(msj);
};
//funcion que realiza la consulta mediante axios
function queryApi(clave){
    //Url de la api de github jobs
    const urlApi =` https://jobs.github.com/positions.json?description=${clave}`;
    //COnfigurando el proxy con la url de git mediante la funcion encode
    const url = `https://api.allorigins.win/get?url=${ encodeURIComponent(urlApi) }`;
    //Utilizando AXIOS para realizar las peticiones
    axios.get(url)
        .then(resp=>{//Luego de la peticion get
            //Funcion que muestra resultados
            const Vacantes = JSON.parse( resp.data.contents);
            showVacantes(Vacantes);
        });
};
//Funcion que muestra el resultado de las busquedas en el html.
function showVacantes(Vacantes){
    console.log(Vacantes)
    //Muestro unicamente si hay resultdos en la busqueda.
    if(Vacantes.length >= 1){
        clearHTML();
        Vacantes.forEach(vacante => {
            let { company , title , type , url } = vacante
            Result.innerHTML += `
            <div class="shadow bg-white p-6 rounded">
                <h2 class="text-2xl font-light mb-4">${title}</h2>
                <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
                <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
                <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
            </div>
            `
        });
    }else{
        //Caso contrario un mensaje.
        Result.innerHTML=`
        <div class="shadow bg-white p-6 rounded text-center">
            <p class="text-2xl font-light mb-4">No hay resultados para mostrar</p>
        </div>
        `
    }
}
//Limpia el html previo en cada busqueda
function clearHTML(){
    while(Result.firstChild){
        Result.removeChild(Result.firstChild)
    }
}

