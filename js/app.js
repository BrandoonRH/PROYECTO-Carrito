//Variables 
const carrito = document.querySelector('#carrito'); //Seleccionamos el div donde esta nuestro carrito 
const contenedorCarrito = document.querySelector('#lista-carrito tbody');//Seleccionamos el body de la tabla
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); //Seleccionamos el boton para vaciar nuestro carrito
const listaCursos = document.querySelector('#lista-cursos'); //Seleccionamos el div padre que contiene todos los cursos
let articulosCarrito = []; //Arreglo para guardar los cursos agregado al carrito 


cargarEventListener(); 

function cargarEventListener(){
    //Cuando agregas un curso presionando "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar cutrso del Carrrito 
    carrito.addEventListener('click', eliminarCurso); 

    //Vaciar Carrito 
    vaciarCarritoBtn.addEventListener('click', () =>{
        let articulosCarrito = []; //reseteamos el carrito
        limpiarHTML(); //Eliminamos todo el html
    });
}


//Functions 
function agregarCurso(e){
   e.preventDefault();//Evitar que un enlace desde la apertura de la URL:

    if(e.target.classList.contains('agregar-carrito')){
       // console.log(e.target.parentElement.parentElement);
        const cursoSeleccionado = e.target.parentElement.parentElement; //Selecciono el div que contiene la información del curso
        leerDatosCurso(cursoSeleccionado);//Mandar el div del curso seleccionado a la funcion
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
       const cursoID = e.target.getAttribute('data-id');
       //Eliminar del arreglo articulosCarrito por el data-id
       articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID); 
       carritoHTML(); //Iterara carrito y mostrar carrito
    }
}

function leerDatosCurso(curso){
    const infoCurso = {
      imagen: curso.querySelector('img').src, 
      titulo: curso.querySelector('h4').textContent, 
      precio: curso.querySelector('.precio span').textContent,
      id: curso.querySelector('a').getAttribute('data-id'),
      cantidad: 1
    }
   
    //Revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //modificar cantidad de curso agregado al carrito
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
               curso.cantidad++;
               return curso;//Retorna Objeto actualizado 
            }else{
                return curso;//retorna objetos actualizados que n o son los duplicados
            }
        });
    articulosCarrito = [...cursos]; 
    }else{
        //Agregar elemntos al arreglo carrito 
        articulosCarrito = [...articulosCarrito, infoCurso]; 
    }
   // console.log(articulosCarrito);
    carritoHTML();
}

function carritoHTML(){
    //Limpiar HTML
    limpiarHTML();
    //Recorrer el carrito y generar HTML
    articulosCarrito.forEach(curso =>{
        const {imagen, titulo, precio, cantidad, id} = curso;
       const row = document.createElement('tr'); 
       row.innerHTML = `
       <td><img src="${imagen}" width="100"></td>
       <td>${titulo}</td>
       <td>${precio}</td>
       <td>${cantidad}</td>
       <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
       `;
       contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML(){
    //contenedorCarrito.innerHTML = ''; 
    while(contenedorCarrito.firstChild){
      contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}