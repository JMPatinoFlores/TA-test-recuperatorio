import express from "express";
import axios from "axios";
import "dotenv/config";

const server = express();

const port = process.env.PORT || 3000;
const api = process.env.API_URL;
const respaldo = process.env.API_URL2;

server.get("/recovery", async (req, res) => {
  try {
    const { data } = await axios.get(api);
    res.status(200).json(data);
  } catch (error) {
    try {
      const { data } = await axios.get(respaldo);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Algo salió mal" });
    }
  }
});

server.use("/", (req, res) => {
  console.log("Esta es la ruta raíz");
  res.status(200).json({ message: "Todo ok" });
});

server.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
