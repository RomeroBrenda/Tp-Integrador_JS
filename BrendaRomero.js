// ESTRUCTURA DEL ARCHIVO
// Sistema de Gestion de una Biblioteca

const prompt = require("prompt-sync")();

// PUNTO 1: ESTRUCTURA DE DATOS
// a) Array "libros" con 10 objetos, cada uno representando un libro con sus propiedades.
// Las propiedades son: id, titulo, autor, año, genero, y si esta disponible o no.
 
let libros = [
    {
        id : 1,
        titulo : "Cien años de soledad",
        autor : "Gabriel García Márquez",
        anio : 1953,
        genero : "Ciencia ficcion",
        disponible : true
    },

    {
    id: 2,
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    anio: 1997,
    genero: "Fantasía",
    disponible: true
  },

  {
    id: 3,
    titulo: "Orgullo y prejuicio",
    autor: "Jane Austen",
    anio: 1813,
    genero: "Romance",
    disponible: true
  },

  {
    id: 4,
    titulo: "El diario de Ana Frank",
    autor: "Ana Frank",
    anio: 1947,
    genero: "Biografía",
    disponible: true
  },

  {
    id: 5,
    titulo: "La ladrona de libros",
    autor: "Markus Zusak",
    anio: 2005,
    genero: "Drama histórico",
    disponible: true
  },

  {
    id: 6,
    titulo: "Matar a un ruiseñor",
    autor: "Harper Lee",
    anio: 1960,
    genero: "Drama",
    disponible: true
  },

  {
    id: 7,
    titulo: "Crónica de una muerte anunciada",
    autor: "Gabriel García Márquez",
    anio: 1981,
    genero: "Policial",
    disponible: false
  },

  {
    id: 8,
    titulo: "El hobbit",
    autor: "J.R.R. Tolkien",
    anio: 1937,
    genero: "Fantasía",
    disponible: true
  },

  {
    id: 9,
    titulo: "Los juegos del hambre",
    autor: "Suzanne Collins",
    anio: 2008,
    genero: "Ciencia ficción",
    disponible: false
  },

  {
    id: 10,
    titulo: "Drácula",
    autor: "Bram Stoker",
    anio: 1897,
    genero: "Terror",
    disponible: true
  }
];

// b) Array "usuarios" con 5 objetos, cada uno representando un usuario con sus propiedades.
// Las propiedades son: id, nombre, email y un array con los IDs de los libros que tiene prestados.

let usuarios = [
    {
    id: 1,
    nombre: "Lucía Martínez",
    email: "lucia.martinez@gmail.com",
    librosPrestados: [2, 5]
  },
  {
    id: 2,
    nombre: "Tomás González",
    email: "tomas.gonzalez@hotmail.com",
    librosPrestados: []
  },
  {
    id: 3,
    nombre: "Sofía Ramírez",
    email: "sofi.ramirez@yahoo.com",
    librosPrestados: [9]
  },
  {
    id: 4,
    nombre: "Bruno Torres",
    email: "bruno.torres@outlook.com",
    librosPrestados: [7, 8]
  },
  {
    id: 5,
    nombre: "Valentina López",
    email: "valen.lopez@gmail.com",
    librosPrestados: []
  }
];

// PUNTO 2: FUNCIONES DE GESTION DE LIBROS
// a) Funcion que agrega un nuevo libro al array.

const agregarLibro = (id, titulo, autor, anio, genero) => {
  // Verifica que los datos no esten vacios ni sean inválidos.
  if (!id || !titulo || !autor || !anio || !genero || isNaN(id) || isNaN(anio)) {
    console.log("❌ Datos inválidos. Verifique los campos ingresados.");
    return;
  }
  
  // Verifica que no exista un libro con el mismo ID.
  if (libros.some(libro => libro.id === id)) {
    console.log("❌ Ya existe un libro con ese ID.");
    return;
  }

  const nuevoLibro = {
    id : id,
    titulo : titulo,
    autor : autor,
    anio : anio,
    genero : genero,
    disponible : true
  };
    
  libros.push(nuevoLibro);
  console.log(`✅ Libro "${titulo}" agregado correctamente.`);
};

// b) Funcion que busca un libro segun el criterio indicado (titulo, autor o genero).

const buscarLibro = (criterio, valor) => {

  // Verifica que el criterio sea uno de los válidos.
  const criteriosValidos = ["titulo", "autor", "genero"];
  if (!criteriosValidos.includes(criterio)) {
    console.log("⚠️ Criterio inválido. Debe ser: titulo, autor o genero.");
    return [];
  }

  // Se filtran los libros según el criterio indicado, ignorando mayúsculas y permitiendo coincidencias parciales.
  const resultados = libros.filter( libro => {
    libro[criterio].toLowerCase().includes(valor.toLowerCase());
  });
    
  if (resultados.length === 0) {
    console.log("⚠️ No se encontraron libros con ese criterio.");
  }
  return resultados;
};

// c) Función que ordena el array "libros" según un criterio utilizando el algoritmo "bubble sort".
// Esta función modifica el array original "libros" directamente.

const ordenarLibros = (criterio) => {

  const criteriosValidos = ["id", "titulo", "autor", "anio", "genero", "disponible"];

  // Valida que el criterio este dentro de una lista de campos permitidos.
  if (!criteriosValidos.includes(criterio)) {
    console.log("❌ Criterio inválido. Usá uno de los siguientes:", criteriosValidos.join(","));
    return;
  }

  // Se valida que el array de libros no esté vacío antes de ordenar.
  if (libros.length === 0) {
    console.log("⚠️ No hay libros para ordenar.");
    return;
  }

  for (let pasada = 0; pasada < libros.length - 1; pasada ++) {
    for (let posicionActual = 0; posicionActual < libros.length - 1 - pasada; posicionActual ++) {

      // Compara el valor del libro actual con el siguiente según el criterio.
      // Si el libro actual tiene un valor mayor, se intercambian de posición.
      if (libros[posicionActual][criterio] > libros [posicionActual + 1] [criterio]) {
                let temporal = libros[posicionActual];
                libros[posicionActual] = libros[posicionActual + 1];
                libros[posicionActual + 1] = temporal;
       }
    }
  }

  console.log(`✅ Libros ordenados por ${criterio}.`);
};

// d) Función que elimina un libro del array "libros" según su id.

const borrarLibro = (id) => {

  // Se verifica si existe un libro con el ID indicado antes de intentar eliminarlo.
  const existe = libros.some(libro => libro.id === id);
  
  if (!existe) {
    console.log("❌ No se encontró un libro con ese ID.");
    return;
  }

  // Se filtran los libros para eliminar el que tiene el ID indicado.
  libros = libros.filter(libro => libro.id !== id);
  console.log(`✅ Libro con ID ${id} eliminado correctamente.`);
};

// PUNTO 3: FUNCIONES DE GESTION DE USUARIOS
// a) Funcion que agrega un nuevo usuario al array "usuarios" asignándole un ID único y sin libros prestados.

const registrarUsuario = (nombre, email) => {

  // Verifica que el nombre y el email no estén vacíos.
  if (!nombre || !email) {
    console.log("❌ Nombre y email son obligatorios.");
    return; 
  }

  // Se valida el formato del email con una expresión regular básica.
  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoEmail.test(email)) {
    console.log("❌ Formato de email inválido.");
    return;
  }

  // Se verifica si ya existe un usuario con ese email.
  if (usuarios.some(usuario => usuario.email === email.toLowerCase())) {
    console.log("⚠️ Ya existe un usuario registrado con ese email.");
    return;
  }

  
  // Se genera un ID único para el nuevo usuario.
  const nuevoId = usuarios.length > 0 
  ? usuarios[usuarios.length - 1].id + 1 
  : 1;
  
  let nuevoUsuario = {
    id: nuevoId,
    nombre: nombre.trim(), 
    email: email.toLowerCase(),
    librosPrestados: []
  };

  usuarios.push (nuevoUsuario);
  console.log(`✅ Usuario ${nombre} registrado correctamente con ID ${nuevoId}.`);
};

// b) Funcion que devuelve el array completo de usuarios registrados.

const mostrarTodosLosUsuarios = () => {
  return usuarios;
};

// c) Funcion que busca y retorna el primer usuario que coincida con el email proporcionado. 
// Retorna null si no existe.

const buscarUsuario = (email) => {

  // Se busca el primer usuario cuyo email coincida exactamente, ignorando mayúsculas.
  const usuarioEncontrado = usuarios.find(usuario => usuario.email === email.toLowerCase());

  if (!usuarioEncontrado) {
    console.log("⚠️ No se encontró un usuario con ese email.");
    return null;
  }

  return usuarioEncontrado;
};

// d) Funcion que elimina del array "usuarios" al usuario que coincida con nombre y email indicados.

const borrarUsuario = (nombre, email) => {

  const usuarioExiste = usuarios.some(usuario =>

    // Se verifica la existencia de un usuario con nombre y email exactos antes de eliminarlo.
    usuario.nombre === nombre && usuario.email === email.toLowerCase()
  );

  if (!usuarioExiste) {
    console.log("❌ No se encontró un usuario con ese nombre y email.");
    return;
  }

  usuarios = usuarios.filter(usuario => 
    !(usuario.nombre === nombre && usuario.email === email.toLowerCase())
  );
  
  console.log(`🗑️ Usuario ${nombre} eliminado correctamente.`);
};

// PUNTO 4: SISTEMA DE PRESTAMOS
// a) Función para prestar un libro.

const prestarLibro = (idLibro, idUsuario) => {
  let libro = libros.find(libro => libro.id === idLibro);
  
  // Se valida que el libro exista y esté disponible.
  if (!libro) {
    console.log("❌ Libro no encontrado.");
    return;
  }

  if (!libro.disponible) {
    console.log(`⚠️ El libro "${libro.titulo}" no está disponible actualmente.`);
    return;
  }

  const usuario = usuarios.find(usuario => usuario.id === idUsuario);

  // Se valida que el usuario exista.
  if (!usuario) {
    console.log("❌¡Usuario no encontrado!");
    return;
  }

  // Se verifica que el usuario no tenga ya ese libro prestado.
  if (usuario.librosPrestados.includes(idLibro)) {
    console.log(`⚠️ El usuario ${usuario.nombre} ya tiene prestado el libro "${libro.titulo}".`);
    return;
  }

// Se actualiza el estado de disponibilidad del libro y el registro de préstamos del usuario.
usuario.librosPrestados.push(idLibro);
libro.disponible = false;

console.log(`✅ El libro "${libro.titulo}" fue prestado a ${usuario.nombre}.`);
};

// b) Función para devolver un libro.

const devolverLibro = (idLibro, idUsuario) => {
  const libro = libros.find(libro => libro.id === idLibro);

  // Se valida que el libro exista.
  if (!libro) {
    console.log("❌¡Libro no encontrado!");
    return;
  }

  const usuario = usuarios.find(usuario => usuario.id === idUsuario);

  // Se valida que el usuario exista.
  if (!usuario) {
    console.log("❌¡Usuario no encontrado!");
    return;
  }

  // Se valida que el libro esté entre los libros prestados del usuario.
  if (!usuario.librosPrestados.includes(idLibro)) {
    console.log(`⚠️ El usuario ${usuario.nombre} no tiene prestado el libro "${libro.titulo}".`);
    return;
  }

  // Se actualiza el array del usuario eliminando el ID del libro, y se marca como disponible.
  usuario.librosPrestados = usuario.librosPrestados.filter(id => id !== idLibro);
  libro.disponible = true;

  console.log(`✅ El libro "${libro.titulo}" fue devuelto por ${usuario.nombre}.`);
};

// PUNTO 5: SISTEMA DE PRESTAMOS
// a) Funcion que genera un reporte de los libros en la biblioteca, incluyendo:
// Cantidad total de libros, libros prestados, libros por género, y el libro más antiguo y más nuevo.

const generarReporteDeLibros = () => {

  // Funcion que permite mostrar una sección específica del reporte de libros.
  const mostrarSeccionDelReporte = (seccion) => {
  const reporte = generarReporteDeLibros();
  if (!reporte) return;

  // Se valida que la sección solicitada exista en el reporte.
  if (!reporte[seccion]) {
    console.log("❌ Sección no válida.");
    console.log("👉 Opciones disponibles: totalLibros, librosPrestados, librosPorGenero, libroMasAntiguo, libroMasNuevo.");
    return;
  }

  // Se muestra la sección solicitada del reporte.
  console.log(`\n📌 ${seccion}:`);
  console.log(reporte[seccion]);
};

  // Se valida que el array de libros no esté vacío.
  if (libros.length === 0) {
    console.log("⚠️ No hay libros en la biblioteca para generar un reporte.");
    return null;
  }

  // Se obtiene la cantidad total de libros en la biblioteca.
  const totalLibros = libros.length;

  // Se obtiene la cantidad de libros cuyo estado es "no disponible" (prestados).
  const librosPrestados = libros.filter(libro => !libro.disponible).length;

  // Se agrupan los libros por género y se cuenta cuántos hay por cada uno.
  const librosPorGenero = libros.reduce((acumulador, libro) => {
    acumulador[libro.genero] = (acumulador[libro.genero] || 0) + 1;
    return acumulador;
  }, {});

  // Se identifica el libro con el año de publicación más antiguo.
  const libroMasAntiguo = libros.reduce((acumulador, libroActual) => 
    libroActual.anio < acumulador.anio 
    ? libroActual 
    : acumulador
  );

  // Se identifica el libro con el año de publicación más reciente.
  const libroMasNuevo = libros.reduce((acumulador, libroActual) => 
    libroActual.anio > acumulador.anio 
    ? libroActual 
    : acumulador
  );

// Se construye el reporte consolidado.
const reporteDeLibros = {
    totalLibros : totalLibros,
    librosPrestados: librosPrestados,
    librosPorGenero: librosPorGenero,
    libroMasAntiguo: {
      titulo: libroMasAntiguo.titulo,
      anio: libroMasAntiguo.anio
    },
    libroMasNuevo: {
      titulo: libroMasNuevo.titulo,
      anio: libroMasNuevo.anio
    }
  };

  return reporteDeLibros;
};

// PUNTO 6: IDENTIFICACION AVANZADA DE LIBROS
// a) Función que identifica los libros cuyo título contiene más de una palabra compuesta solo por letras.

const librosConPalabrasEnTitulo = () => {

  // Se valida que el array no esté vacío.
  if (libros.length === 0) {
    console.log("⚠️ No hay libros disponibles para analizar.");
    return [];
  }

  // Se filtran los libros que cumplen con las condiciones:
  const librosFiltrados = libros.filter(libro => {
    const tituloNormalizado = libro.titulo.trim();

    // Verifica que el titulo tenga mas de una palabra.
    const tieneVariasPalabras = tituloNormalizado.split(" ").length > 1;

    // Verifica que el titulo contenga solo letras (incluyendo tildes, ñ y ü) y espacios.
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(tituloNormalizado);
    return tieneVariasPalabras && soloLetras;
  });
  
  // Se genera un nuevo array con los títulos validos.
const titulosFiltrados = librosFiltrados.map(libro => libro.titulo);

console.log("\n📗 Títulos con más de una palabra y solo letras:");
console.log(titulosFiltrados);

return titulosFiltrados;
};

// PUNTO 7: CALCULOS ESTADISTICOS n
// Función que calcula estadisticas generales de los libros en la biblioteca.
// Incluye el promedio de años de publicación, el año más frecuente, y la diferencia entre el libro 
// más antiguo y el más nuevo.

const calcularEstadisticas = () => {

  // Se genera un array con todos los años de publicación.
  let anios = libros.map(libro => libro.anio);

  // Se suma el total de todos los años, se calcula el promedio y se redondea con Math.round().
  let sumaAnios = anios.reduce ((acumulador, anio) => acumulador + anio, 0);
  let promedio = Math.round(sumaAnios / anios.length);

  // Se construye un  objeto para contar cuántas veces aparece cada año.
  let frecuenciaAnios = {};
  for (let libro of libros) {
    let anio = libro.anio;
    if (frecuenciaAnios[anio]) {
      frecuenciaAnios[anio]++;
    } else {
      frecuenciaAnios[anio] = 1;
    }
  }

  // Se determina cual es el año que aparece con mayor frecuencia.
  let anioMasFrecuente = null; 
  let maxFrecuencia = 0;
  for (let anio in frecuenciaAnios) {
    if (frecuenciaAnios[anio] > maxFrecuencia) {
      maxFrecuencia = frecuenciaAnios[anio];
      anioMasFrecuente = Number (anio);
    }
  }

  // Se inicializan variables para rastrear el año más antiguo y el más reciente.
  let anioMasAntiguo = libros [0].anio;
  let anioMasNuevo = libros [0].anio;

  // Se recorre el array para identificar el año más bajo y más alto.
  libros.forEach(libro => {
    if (libro.anio < anioMasAntiguo) anioMasAntiguo = libro.anio;
    if (libro.anio > anioMasNuevo) anioMasNuevo = libro.anio;
  });
  
  // Se calcula la diferencia de años entre ambos extremos.
  let diferenciaAnios = anioMasNuevo - anioMasAntiguo;

  console.log("Promedio de años de publicacion:", promedio);
  console.log("Año de publicación más frecuente:", anioMasFrecuente);
  console.log("Diferencia entre libro más antiguo y más nuevo:", diferenciaAnios);

  return {
    promedio,
    anioMasFrecuente,
    diferenciaAnios
  };
};
// NOTA: Mejoras pendientes: verificar si hay años repetidos antes de asignar el año mas frecuente.
// Si todos los años aparecen una sola vez, mostrar un mensaje que indique que no hay años repetidos.

// PUNTO 8: MANEJO DE CADENAS
// a) Funcion que normaliza los datos de los libros y usuarios.

const normalizarDatos = () => {
 
 // Convierte todos los títulos de los libros a mayúsculas.
 libros.forEach(libro => {
  libro.titulo = libro.titulo.toUpperCase(); 
 });

 // Elimina espacios en blanco al inicio y final del nombre del autor.
 libros.forEach(libro => {
  libro.autor = libro.autor.trim();
 });
 
// Convierte todos los emails de los usuarios a minúsculas.
 usuarios.forEach(usuario => {
  usuario.email = usuario.email.toLowerCase(); // Convierte el email a minúsculas.
 });
};

// PUNTO 9: INTERFAZ DE USUARIO POR CONSOLA
// Funcion que muestra un menu principal con opciones para la interacción del usuario.

const menuPrincipal = () => {
  let opcion;

  do {
    console.log("\n--- MENÚ PRINCIPAL ---");
    console.log("1. Agregar libro");
    console.log("2. Buscar libro");
    console.log("3. Ordenar libros");
    console.log("4. Borrar libro");
    console.log("5. Registrar usuario");
    console.log("6. Mostrar usuarios");
    console.log("7. Borrar usuario");
    console.log("8. Prestar libro");
    console.log("9. Devolver libro");
    console.log("10. Generar reporte de libros");
    console.log("11. Ver títulos con más de una palabra y solo letras");
    console.log("12. Calcular estadísticas generales");
    console.log("13. Normalizar datos");
    console.log("14. Salir");

    opcion = prompt("Seleccione una opción: ");

    switch (opcion) {
      case "1":
        let id = Number(prompt("Ingrese el ID del libro: "));
        let titulo = prompt("Ingrese el título del libro : ");
        let autor = prompt("Ingrese el autor del libro: ");
        let anio = Number(prompt("Ingrese el año de publicacion: "));
        let genero = prompt("Ingrese el género del libro: ");
        agregarLibro(id, titulo, autor, anio, genero);
        console.log("📚 Libro agregado correctamente.");
        break;

      case "2":
        let criterio = prompt("Buscar por (titulo, autor, genero): ");
        let valor = prompt("Ingrese el valor a buscar: ");
        let resultados = buscarLibro(criterio, valor);
        console.log(resultados);
        break;

      case "3":
        const criterioOrden = prompt("¿Por qué criterio querés ordenar? (id, titulo, autor, anio, genero, disponible): ");
        ordenarLibros(criterioOrden);
        break;

      case "4":
        const idABorrar = Number(prompt("Ingrese el ID del libro a borrar: "));
        borrarLibro(idABorrar);
        break;

      case "5":
        const nombreUsuario = prompt("Ingrese el nombre del usuario: ");
        const emailUsuario = prompt("Ingrese el email del usuario: ");
        registrarUsuario(nombreUsuario, emailUsuario);
        console.log("✅ Usuario registrado correctamente.");
        break;

      case "6":
        console.log(mostrarTodosLosUsuarios());
        break;

      case "7":
        const nombreABorrar = prompt("Ingrese el nombre del usuario a borrar: ");
        const emailABorrar = prompt("Ingrese el email del usuario a borrar: ");
        borrarUsuario(nombreABorrar, emailABorrar);
        break;
    
      case "8":
        const idLibroPrestar = Number(prompt("Ingrese el ID del libro a prestar: "));
        const idUsuarioPrestar = Number(prompt("Ingrese el ID del usuario: "));
        prestarLibro(idLibroPrestar, idUsuarioPrestar);
        break;

      case "9":
        const idLibroDevolver = Number(prompt("Ingrese el ID del libro a devolver: "));
        const idUsuarioDevolver = Number(prompt("Ingrese el ID del usuario: "));
        devolverLibro(idLibroDevolver, idUsuarioDevolver);
        break;

      case "10":
        const reporte = generarReporteDeLibros();
        if (reporte) {
          console.log("\n📊 Reporte general de la biblioteca:");
          console.log(reporte);

          const deseaVerParte = prompt("¿Querés ver una parte específica del reporte? (si/no): ");
          if (deseaVerParte.toLowerCase() === "si") {
            const seccion = prompt("Ingresá la sección que querés ver (totalLibros, librosPrestados, librosPorGenero, libroMasAntiguo, libroMasNuevo): ");
            mostrarSeccionDelReporte(seccion);
          }
        }
        break;

      case "11":
        librosConPalabrasEnTitulo();
        break;

      case "12":
        calcularEstadisticas();
        break;

      case "13":
        normalizarDatos();
        console.log("🔧 Datos normalizados correctamente.");
        break;

      case "14":
        console.log("👋 Saliendo del sistema...");
        break;

      default:
        console.log("⚠️ Opción no válida. Intente nuevamente");
    }
  } while (opcion !== "14");
};

menuPrincipal();

