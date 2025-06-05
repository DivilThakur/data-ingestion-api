# 🚀 Data Ingestion API System (Node.js)

This is a priority-based, rate-limited asynchronous data ingestion system built using **Node.js** and **Express**. It supports submitting ingestion requests with priorities and processes them in batches with simulated external API behavior.


## 🧩 Features

- **Submit ingestion requests** with a list of IDs and a priority.
- **Asynchronous batching** with 3 IDs per batch.
- **Rate limiting**: One batch every 5 seconds.
- **Priority queueing**: HIGH > MEDIUM > LOW, then sorted by submission time.
- **Check status** of each ingestion request.
- **In-memory storage** for simplicity.
- **Test suite** to ensure functionality and rate-limiting rules are respected.



## 🔗 Links

- [🚀 GitHub Repository](https://github.com/DivilThakur/data-ingestion-api)
- [🌐 Live Demo](data-ingestion-api-production-da2f.up.railway.app)

## 🛠️ Tech Stack

- Node.js
- Express.js
- UUID
- Jest, Supertest (for testing)


## 📦 Installation

```bash
git clone https://github.com/DivilThakur/data-ingestion-api-node.git
cd data-ingestion-api-node



## Run The Application
npm start
```
--- 

## 😁 ScreenShots
<p align="center"> <img src="https://github.com/DivilThakur/data-ingestion-api/main/screenshots/Screenshot.png" width="700" alt="Test Output Screenshot"> </p>


