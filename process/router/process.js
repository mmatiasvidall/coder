import { Router } from "express";
import { fork } from "child_process";

const proc = Router();

proc.get("/info", (_req, res) => {
  const processInfo = {
    platforma: process.platform,
    versionNode: process.version,
    carpeta: process.title,
    pathEjecucion: process.execPath,
    processId: process.pid,
    rss: process.memoryUsage().rss,
  };

  res.status(200).json(processInfo);
});

const randomNumbersGeneratorFork = fork("./contenedores/random.js");

proc.get("/randoms", (req, res) => {
  const cant = req.query.cant ?? 100000000;

  randomNumbersGeneratorFork.on("message", (resultado) => {
    res.status(200).json(resultado);
  });
  randomNumbersGeneratorFork.send(cant);
});

export default proc;
