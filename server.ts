import express from "express";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- End-to-End ML System Simulation API ---

  // Mock Model State
  let modelState = {
    version: "1.0.4",
    accuracy: 0.92,
    lastTrained: new Date().toISOString(),
    status: "healthy",
    driftDetected: false,
    invocations: 1240
  };

  // Prediction Endpoint
  app.post("/api/predict", (req, res) => {
    const { features } = req.body;
    // Simulate complex model logic
    const prediction = Math.random() > 0.5 ? "Failure Likely" : "Healthy";
    const confidence = 0.85 + Math.random() * 0.1;
    
    modelState.invocations++;
    
    res.json({
      prediction,
      confidence,
      timestamp: new Date().toISOString(),
      model_version: modelState.version
    });
  });

  // Monitoring Endpoint
  app.get("/api/monitor", (req, res) => {
    res.json({
      ...modelState,
      metrics: {
        latency_ms: [45, 52, 48, 61, 44, 49],
        throughput: [120, 145, 130, 155, 140],
        error_rate: 0.002
      }
    });
  });

  // Demand Forecasting Data (Mocked for the demo)
  app.get("/api/demand-data", (req, res) => {
    const data = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
      actual: 100 + Math.sin(i * 0.5) * 20 + Math.random() * 10,
      forecast: 100 + Math.sin(i * 0.5) * 20 + (i > 20 ? Math.random() * 15 : 0)
    }));
    res.json(data);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
