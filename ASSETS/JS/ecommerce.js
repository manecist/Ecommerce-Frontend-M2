    $(document).ready(function() {
      $('.custom-rounded-group .btn').click(function() {
        // Elimina la clase 'active' de todos los botones en el grupo
        $(this).siblings().removeClass('active');
        // Añade la clase 'active' al botón clickeado
        $(this).addClass('active');
      });
    });