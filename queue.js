import { getNextBatch, updateBatchStatus } from "./store.js";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function simulateExternalFetch(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, data: "processed" }), 500);
  });
}

export function startQueueProcessor() {
  const interval = 1000;
  let isProcessing = false;

  setInterval(async () => {
    if (isProcessing) return;

    const job = getNextBatch();
    if (!job) return;

    isProcessing = true;

    const { ingestionId, batch } = job;

    updateBatchStatus(ingestionId, batch.batch_id, "triggered");

    await Promise.all(batch.ids.map(simulateExternalFetch));
    updateBatchStatus(ingestionId, batch.batch_id, "completed");

    await delay(5000);
    isProcessing = false;
  }, interval);
}
