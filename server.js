import express from "express";
import { v4 as uuidv4 } from "uuid";
import { getStatus, intialiseIngestion } from "./store.js";
import { startQueueProcessor } from "./queue.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.post("/ingest", (req, res) => {
  const { ids, priority } = req.body;

  if (!Array.isArray(ids) || !["HIGH", "MEDIUM", "LOW"].includes(priority)) {
    return res.status(400).json({ Error: "invalid input" });
  }

  const ingestion_id = uuidv4();
  intialiseIngestion(ingestion_id, ids, priority);
  res.json({ ingestion_id });
});

app.get("/status/:id", (req, res) => {
  const ingestion = getStatus(req.params.id);
  if (!ingestion) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(ingestion);
});

startQueueProcessor(); // Start background processing

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;
