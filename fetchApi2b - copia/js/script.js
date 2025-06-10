//URL DE LA API - ENDPOINT
 
const API_URL = "https://retoolapi.dev/msEo4e/expo";
 
//Funcion para llamr a la API y traer el JSON
async function ObtenerPersonas() {
    //obtenemos la respuesta del servidor
    const res = await fetch(API_URL)
    //cONVERTIR LA RESPUESTA DEL SERVIDOR A FORMATO JSON
 
    const data = await res.json();
 
    CrearTabla(data);//Enviamos el JSON  a la funicon creartabla
}
 
//Funcion que creara las filas de la tabla en base a los registros que vienen de la API
function CrearTabla(datos){//Datos representa al JSON que viene de la API
 
    //Se llama "tbody" dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");
 
    //Para inyectar codigo HTML usamos "innerHTML"
    tabla.innerHTML = "";//Vaciamos el contenido de la tabla
 
    datos.forEach( persona => {
        tabla.innerHTML += `
         <tr>
            <td>${persona.id}</td>
             <td>${persona.nombre}</td>
             <td>${persona.apellido}</td>
             <td>${persona.edad}</td>
            <td>${persona.correo}</td>
            <td>
                    <button onClick="AbrirModalEditar(${persona.id}, '${persona.nombre}', '${persona.apellido}', ${persona.edad}, '${persona.correo}')">Editar</button>
                    <button onClick="EliminarRegistro(${persona.id})">Eliminar</button>
                 </td>
         </tr>
       
        `
    });
 
}
ObtenerPersonas();
 
//proceso para agregar un nuevo registro
const modal = document.getElementById("modalAgregar");
const btnAgregar = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");
 
btnAgregar.addEventListener("click", ()=>{
    modal.showModal();
});
 
btnCerrar.addEventListener("click", ()=>{
    modal.close();
});
 
document.getElementById("frmAgregarIntegrante").addEventListener("submit", async e =>{
    e.preventDefault();
 
 
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const correo = document.getElementById("email").value.trim();
   
 
    if(!nombre || !apellido || !correo || !edad){
        alert("Complete todos los campos");
        return;
    }
 
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({nombre,apellido,edad,correo})
    });
 
    if(respuesta.ok){
   
        alert("El registro fue agregado correctamente")
       
        document.getElementById("frmAgregarIntegrante").reset();
   
        modal.close();
 
        ObtenerPersonas();
 
   
    }
    else{
            alert("Hubo un error al agregar");
        }
 
 
});//fin del formulario

//Para eliminar registros

async function EliminarRegistro(id){ //Se pide el Id para borrar u_u
    if(confirm("¿Esta seguro que desea borrar?")){
        await fetch(`${API_URL}/${id}`, {method: `DELETE` }); //Se consigue la Id y se elimina
        ObtenerPersonas(); //Para obtner personas
    }
}

async function ActualizarRegistro(id, nombre, apellido, email, edad){
    
}

//Actualizar registros
const modalEditar = document.getElementById("modalEditar"); //Modal
const btnCerrarEditar = document.getElementById("btnCerrarEditar"); //X para cerrar

//EventListener para cerrar el Modal de editar
btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close();
});

//Abre el modal y tambien le agrega los valores al formulario
function AbrirModalEditar(id, nombre, apellido, edad, correo){

    document.getElementById("idEditar").value = id; //el ID va oculto, pero debe estar presente
    document.getElementById("nombreEditar").value = nombre;
    document.getElementById("apellidoEditar").value = apellido;
    document.getElementById("edadEditar").value = edad;
    document.getElementById("emailEditar").value = correo

    //se abre el modal luego de haberse pasado toda la informacion del registro
    modalEditar.showModal();
}

document.getElementById("frmEditarIntegrante").addEventListener("submit", async e => {
    e.preventDefault(); //Evitamos que el formulario se envie de inmediato

    const id = document.getElementById("idEditar").value;
    const nombre = document.getElementById("nombreEditar"). value;
    const apellido = document.getElementById("apellidoEditar").value;
    const edad = document.getElementById("edadEditar").value;
    const correo = document.getElementById("emailEditar").value;

    //Validar que los campos esten bien
    if(!nombre || !apellido || !edad || !correo || !id){
        alert("Complete todos los campo");
        return;
    }

    //Dolar llaves se pone para poner una variable :b
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({edad,correo,nombre,apellido})
    });

    if(respuesta.ok){
   
        alert("El registro fue actualizado correctamente")
        modalEditar.close(); //Cerramos el modal
        ObtenerPersonas(); //Recargamos la lista
    }
    else{
            alert("Hubo un error al actualizar");
        }
});
