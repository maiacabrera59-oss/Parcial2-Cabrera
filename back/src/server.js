const express = require("express");
const cors = require("cors");
const path = require("path");


require("dotenv").config({ path: path.join(__dirname, "../.env") });

const cursoRoutes = require("./routes/cursoRoutes");
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/cursos", cursoRoutes);

app.get("/", (req, res) => {
  res.send("API Cursos funcionando");
});

console.log("ENV cargado en server.js:");
console.log("DB_SERVER =", process.env.DB_SERVER);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});