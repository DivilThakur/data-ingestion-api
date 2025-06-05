import { v4 as uuidv4 } from "uuid";

const store = new Map();

export const intialiseIngestion = (ingestionId, ids, priority) => {
  const batches = [];
  for (let i = 0; i < ids.length; i += 3) {
    batches.push({
      batch_id: uuidv4(),
      ids: ids.slice(i, i + 3),
      status: "yet_to_start",
    });
  }

  store.set(ingestionId, {
    ingestion_id: ingestionId,
    priority,
    createdAt: Date.now(),
    status: "yet_to_start",
    batches,
  });
};

export function updateBatchStatus(ingestionId, batchId, status) {
  const ingestion = store.get(ingestionId);
  const batch = ingestion.batches.find((b) => b.batch_id === batchId);
  if (batch) batch.status = status;

  const statuses = ingestion.batches.map((b) => b.status);
  if (statuses.every((s) => s === "completed")) {
    ingestion.status = "completed";
  } else if (statuses.some((s) => s === "triggered")) {
    ingestion.status = "triggered";
  } else {
    ingestion.status = "yet_to_start";
  }

  store.set(ingestionId, ingestion);
}

export function getNextBatch() {
  const batches = Array.from(store.values());

  batches.sort((a, b) => {
    const order = { HIGH: 1, MEDIUM: 2, LOW: 3 };
    return order[a.priority] - order[b.priority];
  });

  for (const ingestion of batches) {
    const batch = ingestion.batches.find((a) => a.status === "yet_to_start");
    if (batch) {
      return { ingestionId: ingestion.ingestion_id, batch };
    }
  }
  return null;
}

export function getStatus(id) {
  return store.get(id);
}
