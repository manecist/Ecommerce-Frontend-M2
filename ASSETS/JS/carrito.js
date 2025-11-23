let productosEnCarrito = localStorage.getItem("productos-en-carrito"); /*rescata productos que estan en localstorage*/
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");  /*definicion de botones a utilizar para que funcione*/
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#vaciarCarrito");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#comprarAhora");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
let botonesDisminuir = document.querySelectorAll(".producto-disminuir");

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) { /*Vacia el contenido de carrito de los productos elegidos para:... */

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => { /*inyecta cada fila del producto elegido en agregar gracias a innerhtml y ademas 
            esta el boton de mas y menos se le agrega subtotal y boton eliminar: se esta haciendo un contenedor completo con funciones en js*/
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = ` 
                <img class="carrito-producto-imagen col" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo col">
                    <small>Título</small>
                    <h3 class="nombre-producto">${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad col">
                    <small class="ms-2">Cantidad</small>
                    <div class="d-flex">
                    <button class="producto-disminuir btn" id="${producto.id}">-</button><div class="m-1 pt-1"> 
                    <p class="cantidad">${producto.cantidad}</p>
                    </div><button class="producto-agregar btn" id="${producto.id}">+</button>
                    </div>
                </div>
                <div class="carrito-producto-precio col">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal col">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar col" id="${producto.id}">Eliminar</button>
            `;
    
            contenedorCarritoProductos.append(div); /*sube o agrega mi div creado en inner del carrito en filas*/
        })
                                  /*dar funcionalidad del event lister dentro del IF para que ocurra cuando hayan productos en carrito*/
    actualizarBotonesEliminar(); 
    actualizarBotonesAgregar();
    actualizarBotonesDisminuir();
    actualizarTotal(); 
    actualizarNumerito()
	
    } else {  /* si no hay productos en el carrito, no es necesario que se vean las clases ni el div creado*/
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito(); /*ejecucion del metodo descrito arriba */

function actualizarBotonesEliminar() { /*para el boton eliminar escuche la funcion de click */
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}



function eliminarDelCarrito(e) { 

    const idBoton = e.currentTarget.id; /*rescata el id del boton que estamos apretando*/
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton); /*compara mi id de boton con id productos para buscar 
                                                                                    la posicion (index) del producto en el arreglo*/
    
    productosEnCarrito.splice(index, 1); /*elimina el producto del arreglo por su posicion que usa*/
    cargarProductosCarrito(); /*carga los productos de nuevo para actualizar la lista */
    actualizarNumerito() /*actualiza numero del carrito */
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); /*guarda en el localstorage el resultado del nuevo arreglo*/

}

function actualizarBotonesAgregar() { /*para el boton agregar + escuche la funcion de click */
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
        
    });
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id; /*rescata el id del boton que estamos apretando*/

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {  /*busca en los productos que estan en el carrito si es que existe uno con mismo id */
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton); /*compara mi id de boton con id productos para buscar 
                                                                                    la posicion (index) del producto en el arreglo*/
        productosEnCarrito[index].cantidad++; /*al encontrar producto de la posicion buscada le suma 1 mas */
        
    }
    cargarProductosCarrito(); /*carga los productos de nuevo para actualizar la lista */
    actualizarNumerito(); /*actualiza numero del carrito */

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); /*guarda en el localstorage el resultado del nuevo arreglo*/
}

function actualizarBotonesDisminuir() { /*para el boton disminuir - escuche la funcion de click */
    botonesDisminuir = document.querySelectorAll(".producto-disminuir");

    botonesDisminuir.forEach(boton => {
        boton.addEventListener("click", disminuirAlCarrito);
        
    });
}

function disminuirAlCarrito(e) {

    const idBoton = e.currentTarget.id; /*rescata el id del boton que estamos apretando*/

    if(productosEnCarrito.some(producto => producto.id === idBoton)) { /*busca en los productos que estan en el carrito si es que existe uno con mismo id */
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton); /*compara mi id de boton con id productos para buscar 
                                                                                    la posicion (index) del producto en el arreglo*/
        if(productosEnCarrito[index].cantidad < 2) { /*si la cantidad del producto es menor a 2 se elimina de la fila */
          productosEnCarrito.splice(index, 1);  
        } else { 
        productosEnCarrito[index].cantidad--;  /*si la cantidad del producto es = o > a 2 se disminuye en 1 */
    }} 
    cargarProductosCarrito(); /*carga los productos de nuevo para actualizar la lista */
    actualizarNumerito(); /*actualiza numero del carrito */

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); /*guarda en el localstorage el resultado del nuevo arreglo*/
}

botonVaciar.addEventListener("click", vaciarCarrito); /*Boton vaciar carrito se escucha al hacer click*/
function vaciarCarrito() { 


    productosEnCarrito.length = 0; /*independiente de lo que hay en carrito lo = a 0 y borra todo, porque el lenght (largo) es = 0 */
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); /*guarda en el localstorage el resultado del nuevo arreglo*/
    cargarProductosCarrito(); /*carga los productos de nuevo para actualizar la lista */
    actualizarNumerito() /*actualiza numero del carrito */
}



function actualizarTotal() { /*calcula el total multiplicando el precio por la cantidad del producto */
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0); /* reduce "actua como suma de cada producto", 
                                                                                                                        porque acumula los valores de cada fila */
    total.innerText = `$${totalCalculado}`; /*inyecta en el html carrito en el total */
}

botonComprar.addEventListener("click", comprarCarrito); /*inicialia al escuchar click para comprar, pero en este caso funciona como el boton vaciar
                                                        ya que aun no se puede comprar */
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
    actualizarNumerito()
}

function actualizarNumerito() { /*boton de carrito suma toda la cantidad de productos y lo coloca en el numero carrito */
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}



