const API_URL = "http://localhost:3000/api/cursos";

const formulario = document.querySelector("#formCurso");

const nombre = document.querySelector("#nombre");
const categoria = document.querySelector("#categoria");
const duracion = document.querySelector("#duracion");
const cuposDisponibles = document.querySelector("#cuposDisponibles");
const activo = document.querySelector("#activo");

const listado = document.querySelector("#listadoCursos");
const mensaje = document.querySelector("#mensaje");

const btnCargar = document.querySelector("#btnCargar");
const btnTodos = document.querySelector("#btnTodos");
const btnActivos = document.querySelector("#btnActivos");
const btnInactivos = document.querySelector("#btnInactivos");


let cursosActuales = [];


async function cargarCursos() {
  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error("Error al obtener cursos");
    }

    const cursos = await respuesta.json();

    cursosActuales = cursos;

    mostrarCursos(cursosActuales);

  } catch (error) {
    mensaje.textContent = "No se pudo conectar con la API.";
    mensaje.className = "error";
    console.error(error);
  }
}

function mostrarCursos(cursos) {

  listado.innerHTML = "";

  if (cursos.length === 0) {
    listado.innerHTML =
      '<p class="sin-resultados">No hay cursos para mostrar.</p>';
    return;
  }

  cursos.forEach(curso => {

    const estaActivo =
      curso.activo === true ||
      curso.activo === 1;

    const claseEstado =
      estaActivo ? "activo" : "inactivo";

    const textoEstado =
      estaActivo ? "Activo" : "Inactivo";

    listado.innerHTML += `
      <div class="tarjeta">

        <h3>${curso.nombre}</h3>

        <p>
          <strong>Categoría:</strong>
          ${curso.categoria}
        </p>

        <p>
          <strong>Duración:</strong>
          ${curso.duracion} horas
        </p>

        <p>
          <strong>Cupos disponibles:</strong>
          ${curso.cuposDisponibles}
        </p>

        <p class="${claseEstado}">
          ${textoEstado}
        </p>

        <button
          class="eliminar"
          onclick="eliminarCurso(${curso.id})"
        >
          Eliminar
        </button>
      </div>
    `;
  });
}

function mostrarTodos() {
  mostrarCursos(cursosActuales);
}


function mostrarActivos() {

  const activos = cursosActuales.filter(
    curso =>
      curso.activo === true ||
      curso.activo === 1
  );

  mostrarCursos(activos);
}

function mostrarInactivos() {

  const inactivos = cursosActuales.filter(
    curso =>
      curso.activo === false ||
      curso.activo === 0
  );

  mostrarCursos(inactivos);
}


async function guardarCurso(evento) {

  evento.preventDefault();

  const nuevoCurso = {
    nombre: nombre.value.trim(),
    categoria: categoria.value.trim(),
    duracion: Number(duracion.value),
    cuposDisponibles: Number(cuposDisponibles.value),
    activo: activo.value === "true"
  };

  if (
    nuevoCurso.nombre === "" ||
    nuevoCurso.categoria === "" ||
    nuevoCurso.duracion <= 0 ||
    nuevoCurso.cuposDisponibles <= 0
  ) {

    mensaje.textContent =
      "Debe completar todos los datos correctamente.";

    mensaje.className = "error";

    return;
  }

  try {

    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoCurso)
    });

    if (!respuesta.ok) {
      throw new Error("Error al guardar");
    }

    mensaje.textContent =
      "Curso guardado correctamente.";

    mensaje.className = "ok";

    formulario.reset();

    cargarCursos();

  } catch (error) {

    mensaje.textContent =
      "Error al guardar el curso.";

    mensaje.className = "error";

    console.error(error);
  }
}

async function eliminarCurso(id) {

  if (!confirm("¿Desea eliminar este curso?")) {
    return;
  }

  try {

    const respuesta = await fetch(
      `${API_URL}/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!respuesta.ok) {
      throw new Error("Error al eliminar");
    }

    mensaje.textContent =
      "Curso eliminado correctamente.";

    mensaje.className = "ok";

    cargarCursos();

  } catch (error) {

    mensaje.textContent =
      "Error al eliminar el curso.";

    mensaje.className = "error";

    console.error(error);
  }
}



formulario.addEventListener(
  "submit",
  guardarCurso
);

btnCargar.addEventListener(
  "click",
  cargarCursos
);

btnTodos.addEventListener(
  "click",
  mostrarTodos
);

btnActivos.addEventListener(
  "click",
  mostrarActivos
);

btnInactivos.addEventListener(
  "click",
  mostrarInactivos
);


cargarCursos();