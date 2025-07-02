// ESTRUCTURA DEL ARCHIVO
// Sistema de Gestion de una Biblioteca

// PUNTO 1: ESTRUCTURA DE DATOS
// a) Creamos un array llamado "libros" que contiene 10 objetos.
// _ Cada objeto representa un libro con: id, titulo, autor, año, genero, y si esta disponible o no.
 
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

// b) Creamos un array llamado "usuarios" que contiene 5 objetos.
/* _ Cada objeto representa un usuario con id, nombre, email y un array con los IDs de los libros que
tiene prestados. */

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
// a) Funcion para agregar un nuevo libro al array.

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

// b) Funcion para buscar un libro segun el criterio indicado (titulo, autor o genero).

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

// c) Funcion para ordenar libros por año usando "bubble sort".

const ordenarLibros = (criterio) => {
    for (let pasada = 0; pasada < libros.length - 1; pasada ++) {
        for (let posicionActual = 0; posicionActual < libros.length - 1 - pasada; posicionActual ++) {

            // 👉 "Si el valor del libro actual (por ejemplo, su año) es mayor al del siguiente libro..."
            // ➡️ Entonces están en el orden incorrecto y hay que cambiarlos de lugar.
            if (libros[posicionActual][criterio] > libros [posicionActual + 1] [criterio]) {

                // Intercambiamos los libros
                let temporal = libros[posicionActual];
                libros[posicionActual] = libros[posicionActual + 1];
                libros[posicionActual + 1] = temporal;
            }
        }
    }
};

// d) Funcion para eliminar el libro que se le pase por parametro del array "libros".
// Utilizamos el metodo .filter() para crear un nuevo array sin el libro con ese id.

const borrarLibro = (id) => {
    libros = libros.filter(libro => libro.id !== id);
};

// PUNTO 3: FUNCIONES DE GESTION DE USUARIOS
// a) Funcion para agregar un nuevo usuario al array.

const registrarUsuario = (nombre, email) => {

  // Generamos un nuevo ID único basado en el último usuario registrado o 1 si no hay usuarios.
  let nuevoId = usuarios.length > 0 
  ? usuarios[usuarios.length - 1]. id + 1 
  : 1;
  
  // Creamos el usuario con los datos recibidos y sin libros prestados.
  let nuevoUsuario = {
    id: nuevoId,
    nombre: nombre,
    email: email,
    librosPrestados: []
  }
  
  // Utilizamos el método .push() para agregar el nuevo usuario al array "usuarios".
  usuarios.push (nuevoUsuario);
};

// b) Funcion para mostrar todos los usuarios registrados.

const mostrarTodosLosUsuarios = () => {
  return usuarios;
};

// c) Funcion para buscar un usuario por su email.
// Retorna el primer usuario que coincida o null si no existe

const buscarUsuario = (email) => {
  let usuarioEncontrado = usuarios.find(usuario => usuario.email === email);
  return usuarioEncontrado || null;
};

// d) Funcion para eliminar un usuario según su nombre y su email.
//  Usamos .filter() para crear un nuevo array sin el usuario que coincida con ambos datos.

const borrarUsuario = (nombre, email) => {
  usuarios = usuarios.filter(usuario => {
    return !(usuario.nombre === nombre && usuario.email === email);
  });

};

// PUNTO 4: SISTEMA DE PRESTAMOS
// a) Función para prestar un libro: marca el libro como no disponible y lo asigna al usuario.
// Busca el libro y usuario por ID, verifica disponibilidad y actualiza el estado.

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
