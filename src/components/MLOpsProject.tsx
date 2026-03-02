import React, { useEffect, useState } from "react";
import { Activity, Server, ShieldCheck, Play, RefreshCw, BarChart3 } from "lucide-react";
import { ModelMetrics, PredictionResult } from "../types";
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from "recharts";

export const MLOpsProject: React.FC = () => {
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMetrics = () => {
    fetch("/api/monitor")
      .then((res) => res.json())
      .then(setMetrics);
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const runPrediction = async () => {
    setLoading(true);
    const res = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features: [Math.random(), Math.random()] }),
    });
    const data = await res.json();
    setPrediction(data);
    setLoading(false);
  };

  if (!metrics) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* System Status Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-zinc-900 text-white p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-full animate-pulse">
            <Activity size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Production Pipeline Active</h3>
            <p className="text-zinc-400 text-sm">Model Version: {metrics.version}</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-zinc-500 text-xs uppercase tracking-wider font-bold">Accuracy</p>
            <p className="text-xl font-mono">{(metrics.accuracy * 100).toFixed(1)}%</p>
          </div>
          <div className="text-center">
            <p className="text-zinc-500 text-xs uppercase tracking-wider font-bold">Latency</p>
            <p className="text-xl font-mono">{metrics.metrics.latency_ms[0]}ms</p>
          </div>
          <div className="text-center">
            <p className="text-zinc-500 text-xs uppercase tracking-wider font-bold">Drift</p>
            <p className={`text-xl font-mono ${metrics.driftDetected ? 'text-red-400' : 'text-emerald-400'}`}>
              {metrics.driftDetected ? 'Detected' : 'None'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* API Playground */}
        <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Server size={20} className="text-zinc-400" />
              Inference API
            </h3>
            <button 
              onClick={runPrediction}
              disabled={loading}
              className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-xl hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {loading ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />}
              Test Endpoint
            </button>
          </div>
          
          <div className="bg-zinc-50 rounded-xl p-6 font-mono text-sm border border-zinc-100 min-h-[200px]">
            {prediction ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-200 pb-2">
                  <span className="text-zinc-500">Prediction:</span>
                  <span className={`font-bold ${prediction.prediction === 'Failure Likely' ? 'text-red-600' : 'text-emerald-600'}`}>
                    {prediction.prediction}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-200 pb-2">
                  <span className="text-zinc-500">Confidence:</span>
                  <span className="font-bold">{(prediction.confidence * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Timestamp:</span>
                  <span className="text-zinc-400 text-xs">{new Date(prediction.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                <BarChart3 size={48} className="mb-4 opacity-20" />
                <p>Click "Test Endpoint" to simulate a real-time inference request</p>
              </div>
            )}
          </div>
        </div>

        {/* Monitoring Dashboard */}
        <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ShieldCheck size={20} className="text-zinc-400" />
            Model Monitoring
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-zinc-500 mb-2">Latency (ms) - Last 5 Requests</p>
              <div className="h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metrics.metrics.latency_ms.map((v, i) => ({ val: v, id: i }))}>
                    <Line type="monotone" dataKey="val" stroke="#18181b" strokeWidth={2} dot={{ r: 4, fill: '#18181b' }} />
                    <XAxis hide />
                    <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Total Invocations</p>
                <p className="text-2xl font-bold">{metrics.invocations}</p>
              </div>
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Error Rate</p>
                <p className="text-2xl font-bold">{(metrics.metrics.error_rate * 100).toFixed(3)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-zinc max-w-none bg-zinc-50 p-8 rounded-2xl border border-zinc-200">
        <h3 className="text-zinc-900">End-to-End MLOps Pipeline</h3>
        <p className="text-zinc-600">
          This system implements a full <strong>MLOps Lifecycle</strong> for Predictive Maintenance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h4 className="text-zinc-800 font-semibold mb-2">1. Automation & CI/CD</h4>
            <p className="text-sm text-zinc-500">GitHub Actions triggers model retraining when data drift is detected or new code is pushed. Docker ensures environment parity.</p>
          </div>
          <div>
            <h4 className="text-zinc-800 font-semibold mb-2">2. Monitoring & Feedback</h4>
            <p className="text-sm text-zinc-500">Real-time monitoring of latency, throughput, and statistical drift using Prometheus and Grafana (simulated here).</p>
          </div>
        </div>
      </div>
    </div>
  );
};
