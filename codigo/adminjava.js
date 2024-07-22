// Función para cargar los usuarios desde el archivo usuarios.json
function cargarUsuarios() {
  $.getJSON('/api/usuarios', function(usuarios) {
    const usuariosList = $('#usuarios-list');
    usuariosList.empty(); // Limpiar la tabla antes de agregar los nuevos datos
    usuarios.forEach(usuario => {
      usuariosList.append(`
        <tr>
          <td>${usuario.id}</td>
          <td>${usuario.username}</td> <!-- Asegúrate de que esta propiedad existe -->
          <td>${usuario.email}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
          </td>
        </tr>
      `);
    });
  }).fail(function(jqXHR, textStatus, errorThrown) {
    alert('Error al cargar usuarios: ' + textStatus);
  });
}

// Función para agregar un usuario (abrir un formulario modal o redirigir a una página para agregar)
function agregarUsuario() {
  alert('Funcionalidad de agregar usuario no implementada.');
}

// Función para eliminar un usuario
function eliminarUsuario(userId) {
  $.ajax({
    url: `/api/usuarios/${userId}`, // Revisa si esta ruta es la correcta para eliminar usuarios
    type: 'DELETE',
    success: function(result) {
      alert('Usuario eliminado');
      cargarUsuarios(); // Recargar la lista de usuarios después de eliminar
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('Error al eliminar usuario: ' + textStatus);
    }
  });
}

// Función para cargar los anuncios
function cargarAnuncios() {
  $.getJSON('/api/anuncios', function(anuncios) {
    const anunciosList = $('#anuncios-list');
    anunciosList.empty();
    anuncios.forEach(anuncio => {
      anunciosList.append(`
        <tr>
          <td>${anuncio.id}</td>
          <td><img src="${anuncio.imagen}" alt="Anuncio" style="width: 100px;"></td>
          <td><a href="${anuncio.enlace}" target="_blank">${anuncio.enlace}</a></td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="eliminarAnuncio(${anuncio.id})">Eliminar</button>
          </td>
        </tr>
      `);
    });
  }).fail(function(jqXHR, textStatus, errorThrown) {
    alert('Error al cargar anuncios: ' + textStatus);
  });
}

// Función para agregar un anuncio (abrir un formulario modal o redirigir a una página para agregar)
function agregarAnuncio() {
  alert('Funcionalidad de agregar anuncio no implementada.');
}

// Función para cargar las estadísticas de clics
function cargarEstadisticas() {
  $.getJSON('/api/clicks', function(clics) {
    const estadisticasClics = $('#estadisticas-clics');
    estadisticasClics.empty();
    let totalDinero = 0;
    const dineroPorClic = 0.05; // Dinero generado por clic
    for (const [id, cantidad] of Object.entries(clics)) {
      const dineroGenerado = cantidad * dineroPorClic;
      totalDinero += dineroGenerado;
      estadisticasClics.append(`
        <tr>
          <td>${id}</td>
          <td>${cantidad}</td>
          <td>$${dineroGenerado.toFixed(2)}</td>
        </tr>
      `);
    }
    $('#dinero-generado').text(`$${totalDinero.toFixed(2)}`);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    alert('Error al cargar estadísticas de clics: ' + textStatus);
  });
}

// Cargar los datos cuando la página está lista
$(document).ready(function() {
  cargarUsuarios();
  cargarAnuncios();
  cargarEstadisticas();
});
