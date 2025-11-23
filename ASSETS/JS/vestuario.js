let productos = [];

fetch("/Ecommerce-Frontend-M2/ASSETS/JS/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        const productosCosmeticos = productos.filter(producto => producto.categoria.id === 'vestuario');
        cargarProductos(productosCosmeticos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");



function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
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

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "vestuario") {
            const productosBoton = productos.filter(producto => producto.categoria.subcategoria === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

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