/*Variables*/
const contenedorAlbums = document.querySelector('#row__albums');
const main = document.querySelector('#main');
const rowsSelect = document.querySelectorAll(".row__select");
const cantidadProductos = document.querySelector("#carrito__number");
const nombre = document.querySelectorAll(".nombre__lista__option")



//Definir el source de la bandera de acuerdo al país
const datoPais = {
    banderaPais: "",
    descripcionPais: "",
}


//Obtener de Local Storage los productos de carrito
const albumsPreviosCarrito = JSON.parse(localStorage.getItem('albumsCarrito'));


/*:::::::: Eventos Listeners :::::::::::*/

//Mostrar Albums
document.addEventListener('DOMContentLoaded', ()=>{
    //Cargar si existen productos agregdos previamente
    if(albumsPreviosCarrito){
        albumsCarrito = [...albumsPreviosCarrito];
    }

    mostrarCantidadProductos();

    mostrarAlbums(albums);
})

//Agregar eventos a cada una de las opciones
nombre.forEach( (elemento) => {
    elemento.addEventListener('click', agregarDatosBusqueda);
});

//Agregar elemento al carrito cuando se presiona en "Comprar"
contenedorAlbums.addEventListener('click', agregarAlbum);

/*:::::::: Funciones :::::::::::*/

//Desplegar lista de albums
function mostrarAlbums(albums){
    //Limpiar html
    limpiarHTML();
    
    //Construir html de autos
    albums.forEach(album =>{

        const albumHTML = document.createElement('DIV');
        albumHTML.classList.add("album");

        album.pais = "Colombia"
        datoPais.banderaPais = "img/colombia.png";
        datoPais.descripcionPais = "bandera de España";

        albumHTML.innerHTML = `
            <img src="img/${album.img}" alt="" class="album__imagen">
            <div class="album__container__info">
                <p class="album__titulo">${album.artista}</p>
                <div class="album__info__artista">
                    <div>
                        <img src="${datoPais.banderaPais}" alt="${datoPais.descripcionPais}" class="album__artista__pais">
                    </div>
                    <p class="album__precio">$<span>100.000</span></p>
                </div>
                <button class="btn__agregar__carrito" data-id="${album.id}">Comprar</button>
            </div>
        `;

        contenedorAlbums.appendChild(albumHTML);
    })
}

//Funcion Agregar opciones selecionadas a datosBusqueda

function agregarDatosBusqueda(e){
    const titulo = e.target.parentElement.previousElementSibling.getAttribute('data-title');
    const valor = e.target.innerText;
    const selectValor = e.target;

    if(titulo === 'artista'){

        if(valor === "Ninguno"){
            datosBusqueda.artista = "";
        } else{
            datosBusqueda.artista = valor;
        }

        elementFilterArtist.forEach(elemento =>{
            elemento.classList.remove("active");
        })
        selectValor.classList.toggle("active");

    } else if( titulo === 'fecha'){

        if(valor === "Ninguno"){
            datosBusqueda.fecha = "";
        } else{
            datosBusqueda.fecha = valor;
        }

        elementFilterFecha.forEach(elemento =>{
            elemento.classList.remove("active");
        })
        selectValor.classList.toggle("active");

        //Aún en prueba para ejecutar los filtros al llegar al mediaquery
        if(mediaqueryList.matches){
            filtrarAlbum() 
        }
        
    } else{

        if(valor === "Ninguno"){
            datosBusqueda.pais = "";
        } else{
            datosBusqueda.pais = valor;
        }
        
        elementFilterPais.forEach(elemento =>{
            elemento.classList.remove("active");
        })
        selectValor.classList.toggle("active");

        //Aún en prueba para ejecutar los filtros al llegar al mediaquery
        if(mediaqueryList.matches){
            filtrarAlbum() 
        }
    }
}


//Limpiar HTML
function limpiarHTML(){

    //Limpitar resultados previos
    while(contenedorAlbums.firstChild){
        contenedorAlbums.removeChild(contenedorAlbums.firstChild);
    }

}

//Agregar album al carrito
function agregarAlbum(e){
    if(e.target.classList.contains("btn__agregar__carrito")){
        const albumSeleccionado = e.target.parentElement.parentElement;

        //Pasamos a la funcion el curso seleccionado para tomar sus datos
        leerDatosAlbum(albumSeleccionado);
    }
}

//Leer datos de album seleccionado
function leerDatosAlbum(album){
    const datosAlbum = {
        nombre: album.querySelector('.album__titulo').textContent,
        id: album.querySelector('.btn__agregar__carrito').getAttribute('data-id'),
        imagen: album.querySelector('.album__imagen').src,
        precio: album.querySelector('.album__precio span').textContent,
        cantidad: 1
    }

    //Verificar si el album se ha agregado previamente.
    if(albumsCarrito.some(curso => curso.id === datosAlbum.id)){
        const albums = albumsCarrito.map( curso => {
            if(curso.id === datosAlbum.id) {
                //Suma la cantidad para ele elemento que ya se encuentre su id
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });

        //Al agregar con spread operator se agregan los elementos internos del array.
        albumsCarrito = [...albums];
    } else{
        //En caso de que el id no se repita, se agrega como un elemento nuevo
        albumsCarrito = [...albumsCarrito, datosAlbum];
    }
        
    //Actualiza cantidad de productos en el carrito que se muestran
    mostrarCantidadProductos();

    //Actualiza local storage con el nuevo elemento
    const producto = JSON.stringify(albumsCarrito);
    localStorage.setItem('albumsCarrito', producto);
}

//Mostrar cantidad de productos
function mostrarCantidadProductos(){
    //Obtener cantidad de Productos Actual
    let cantidadProductosActual = albumsCarrito.reduce((valorAcumulado, valorActual)=> valorAcumulado + valorActual.cantidad, 0);

    //Mostrar Datos
    cantidadProductos.textContent = cantidadProductosActual;
}
