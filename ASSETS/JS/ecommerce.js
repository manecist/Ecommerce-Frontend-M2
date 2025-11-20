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