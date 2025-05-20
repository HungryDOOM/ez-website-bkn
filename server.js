import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise"; // Para bases SQL

dotenv.config(); // Carga variables de entorno

const app = express();
app.use(cors());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

app.get("/datos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos" });
  }
});

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));