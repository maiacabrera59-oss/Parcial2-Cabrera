const express = require("express");

const router = express.Router();

const { obtenerCursosTotales,obtenerCursoPorId, crearCurso,  eliminarCurso } = require("../controllers/cursoController");

router.get("/", obtenerCursosTotales);

router.get("/:id", obtenerCursoPorId);

router.post("/", crearCurso);

router.delete("/:id", eliminarCurso);

module.exports = router;