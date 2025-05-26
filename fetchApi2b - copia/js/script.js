//URL DE LA API
const API_URL = "https://retoolapi.dev/msEo4e/expo"

//Funcion para llamar a la api y traer el json
async function  ObtenerPersonas(){
    //Obtenemos la respuesta del servidor
    const res = await fetch(API_URL);
    //Convertir la respuesta del servidor a formato JSON
    const data = await res.json(); //esto es un json

    CrearTabla(data); //Enviamos el JSON a la funcion "CrearTbbbla"
}

//Funcion que creara las filas de la tabla en base a los registros que vienen de la api

function CrearTabla(datos){ //"Datos" representa al JSON que viene de la API
    //Se llama al tbody dentro de la tabla "tabña"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar codigo HTML usamos "innerHMTL"
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(persona =>{
        tabla.innerHTML += `
            <tr>
                 <td>${persona.id}</td>
                 <td>${persona.nombre}</td>
                 <td>${persona.apellido}</td>
                 <td>${persona.edad}</td>
                 <td>${persona.correo}</td>
                 <td>
                 <button>Editar</button>
                 <button>Eliminar</button>
                 </td>
             </tr>
        `
    });

}
//Se llama obtene personas
ObtenerPersonas();