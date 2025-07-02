// ESTRUCTURA DEL ARCHIVO
// Sistema de Gestion de una Biblioteca

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
    let nuevoLibro = {
        id : id,
        titulo : titulo,
        autor : autor,
        anio : anio,
        genero : genero,
        disponible : true
    };
    
    libros.push(nuevoLibro);
};

// b) Funcion que busca un libro segun el criterio indicado (titulo, autor o genero).

// NOTA: Más adelante agregar validación para verificar que el criterio exista en los objetos.
// Esto evitará errores si se ingresa un criterio inválido en "buscarLibro2 o "ordenarLibros".
const buscarLibro = (criterio, valor) => {
    let resultados = [];

    for (let libro of libros) {
        if (libro[criterio] === valor) {
            resultados.push(libro);
        }
    }
    
    return resultados;
};
// NOTA: más adelante se puede mejorar para que la búsqueda no distinga mayúsculas/minúsculas ni tildes.

// c) Función que ordena el array "libros" según un criterio utilizando el algoritmo "bubble sort".

const ordenarLibros = (criterio) => {
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
};

// d) Función que elimina un libro del array "libros" según su id.

const borrarLibro = (id) => {
    libros = libros.filter(libro => libro.id !== id);
};

// PUNTO 3: FUNCIONES DE GESTION DE USUARIOS
// a) Funcion que agrega un nuevo usuario al array "usuarios" asignándole un ID único y sin libros prestados.

const registrarUsuario = (nombre, email) => {
  let nuevoId = usuarios.length > 0 
  ? usuarios[usuarios.length - 1]. id + 1 
  : 1;
  
  let nuevoUsuario = {
    id: nuevoId,
    nombre: nombre,
    email: email,
    librosPrestados: []
  }

  usuarios.push (nuevoUsuario);
};

// b) Funcion que devuelve el array completo de usuarios registrados.

const mostrarTodosLosUsuarios = () => {
  return usuarios;
};

// c) Funcion que busca y retorna el primer usuario que coincida con el email proporcionado. 
// Retorna null si no existe.
const buscarUsuario = (email) => {
  let usuarioEncontrado = usuarios.find(usuario => usuario.email === email);
  return usuarioEncontrado || null;
};

// d) Funcion que elimina del array "usuarios" al usuario que coincida con nombre y email indicados.

const borrarUsuario = (nombre, email) => {
  usuarios = usuarios.filter(usuario => {
    return !(usuario.nombre === nombre && usuario.email === email);
  });
};

// PUNTO 4: SISTEMA DE PRESTAMOS
// a) Función para prestar un libro: verifican la existencia y disponibilidad del libro y del usuario.
// Actualiza el estado del libro y los préstamos del usuario.

const prestarLibro = (idLibro, idUsuario) => {
  let libro = libros.find(libro => libro.id === idLibro);
  
  if (!libro || !libro.disponible) {
    console.log("¡El libro no esta disponible o no fue encontrado!");
    return;
  }
  
  let usuario = usuarios.find(usuario => usuario.id === idUsuario);

  if (!usuario) {
    console.log("¡Usuario no encontrado!");
    return;
  }

  usuario.librosPrestados.push(idLibro);
  
  libro.disponible = false;
  console.log(`El libro ${libro.titulo} fue prestado a ${usuario.nombre}.`);
};

// b) Función para devolver un libro: verifica la existencia del libro y del usuario, como también si el usuario
// tiene el libro prestado. Actualiza el estado del libro y los préstamos del usuario.

const devolverLibro = (idLibro, idUsuario) => {
  let libro = libros.find(libro => libro.id === idLibro);

  if (!libro) {
    console.log("¡Libro no encontrado!");
    return;
  }

  let usuario = usuarios.find(usuario => usuario.id === idUsuario);

  if (!usuario) {
    console.log("¡Usuario no encontrado!");
    return;
  }

  if (!usuario.librosPrestados.includes(idLibro)) {
    console.log(`Elusuario ${usuario.nombre} no tiene prestado el libro: ${libro.titulo}.`);
    return;
  }

  usuario.librosPrestados = usuario.librosPrestados.filter(id => id !== idLibro);
  libro.disponible = true;
};

// PUNTO 5: SISTEMA DE PRESTAMOS
// a) Funcion que genera un reporte de los libros en la biblioteca, incluyendo:
// Total de libros, cantidad de libros prestados, cantidad de libros por género, y los libros más antiguo y más nuevo.

const totalLibros = libros.length;

const librosPrestados = libros.filter(libro => !libro.disponible).length;

const librosPorGenero = libros.reduce((acumulador, libro) => {
  if (acumulador[libro.genero]) {
    acumulador[libro.genero]++;
  } else {
    acumulador[libro.genero] = 1;
  }
  return acumulador;
}, {});

const libroMasAntiguo = libros.reduce((acumulador, libroActual) => {
  if (libroActual.anio < acumulador.anio) {
    return libroActual;
  }
  return acumulador;
});


const libroMasNuevo = libros.reduce((acumulador, libroActual) => {
  if (libroActual.anio > acumulador.anio) {
    return libroActual;
  }
  return acumulador;
});

const generarReporteDeLibros = () => {
  return {
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
};
// NOTA: En las futuras mejoras incluir: 
// _Agregar validaciones para manejar casos donde el array de libros esté vacío.
// _Normalizar y estandarizar la presentación del reporte (devolver solo título y año en vez de todo el objeto).
// _Posibilidad de solicitar partes específicas del reporte según necesidad del usuario.










