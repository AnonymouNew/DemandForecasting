export interface DemandData {
  date: string;
  actual: number;
  forecast: number;
}

export interface ModelMetrics {
  version: string;
  accuracy: number;
  lastTrained: string;
  status: string;
  driftDetected: boolean;
  invocations: number;
  metrics: {
    latency_ms: number[];
    throughput: number[];
    error_rate: number;
  };
}

export interface PredictionResult {
  prediction: string;
  confidence: number;
  timestamp: string;
  model_version: string;
}
