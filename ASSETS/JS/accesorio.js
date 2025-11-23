let productos = []; /*crea una rreglo array */

fetch("/Ecommerce-Frontend-M2/ASSETS/JS/productos.json")  /*carga los productos de categoria accesorio del json*/
    .then(response => response.json())
    .then(data => {
        productos = data;
        const productosCosmeticos = productos.filter(producto => producto.categoria.id === 'accesorio'); /*le hace un filtro donde solo busca accesorios */
        cargarProductos(productosCosmeticos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos"); /*se le dio valores a mis botones */
const botonesCategorias = document.querySelectorAll(".boton-categoria");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");



function cargarProductos(productosElegidos) { /* vacia el div de productos para llenarlo */

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div"); /*crea el div para inyectar con los productos */
        div.classList.add("producto");
        div.classList.add("card");
        div.innerHTML = `
            <img class="producto-imagen img-fluid rounded-5" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div); /*sube la informacion al html */
    })

    actualizarBotonesAgregar(); /*actualiza los botones agregar */
}


botonesCategorias.forEach(boton => { /*prepara todos los botones de categoria */
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active")); /*quita clase activo a todos los botones */
        e.currentTarget.classList.add("active"); /*añade la clase actuvo al boton selecionado */

        if (e.currentTarget.id != "accesorio") { /*si el boton selecionado es diferente a accesorio filtra por subcategoria*/
            const productosBoton = productos.filter(producto => producto.categoria.subcategoria === e.currentTarget.id);
            cargarProductos(productosBoton); /*carga solo los productos con ese filtro */
        } else {
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id); /*si el boton es = a accesorio filtra por categoria */
            cargarProductos(productosBoton); /*carga solo los productos con ese filtro */
        }

    })
});

function actualizarBotonesAgregar() { /*inicializa el boton agregar */
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito; /*define el carrito */

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito"); /*rescata el local storage */

if (productosEnCarritoLS) { /*agrega al carrito lo del local storage */
    productosEnCarrito = JSON.parse(productosEnCarritoLS); 
    actualizarNumerito(); /*actualiza el numero del carrito segun cantidad de productos */
} else {
    productosEnCarrito = []; /*si el local storage esta vacio, lo deja en 0*/
}

function agregarAlCarrito(e) { /*agrega productos al carrito segun id y si esta le suma 1 mas, y si no su valor sera de uno */

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

var btnSubir = document.getElementById("btnSubir");

  // Muestra u oculta el botón al hacer scroll luego de 20 px
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) { //20 px por debajo del titulo
      btnSubir.style.display = "block"; //muestra si el usuario bajo
    } else {
      btnSubir.style.display = "none"; //oculta si el usuario esta arriba
    }
};

  // Desplaza suavemente hacia arriba al hacer clic en el botón
btnSubir.addEventListener("click", function() { //es mi funcion alerta para la consola al hacer click
    window.scrollTo({ //cada vez que el usuario se desplaza
      top: 0,
      behavior: "smooth" // Para un desplazamiento suave
    });
});