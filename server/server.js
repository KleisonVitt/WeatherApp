import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.VC_API_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "Cidade não informada" });
  }

  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
      city
    )}?unitGroup=metric&key=${API_KEY}&contentType=json`;

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro da API Visual Crossing:", errorText);
      throw new Error("Erro na consulta da API");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados do clima" });
  }
});

app.get("/api/weather/mock", async (req, res) => {
  try {
    const mockPath = path.join(__dirname, "mock.json");
    const data = await fs.readFile(mockPath, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.log("Erro ao ler mock.json: ", error);
    res.status(500).send("Erro interno ao ler dados mockados.");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
