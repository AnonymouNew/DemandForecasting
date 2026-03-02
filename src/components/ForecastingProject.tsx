import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Info, BrainCircuit } from "lucide-react";
import { DemandData } from "../types";

export const ForecastingProject: React.FC = () => {
  const [data, setData] = useState<DemandData[]>([]);

  useEffect(() => {
    fetch("/api/demand-data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <h4 className="font-semibold">Model Accuracy</h4>
          </div>
          <p className="text-3xl font-bold text-zinc-900">94.2%</p>
          <p className="text-sm text-zinc-500 mt-1">MAPE: 5.8%</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <BrainCircuit size={20} />
            </div>
            <h4 className="font-semibold">Algorithm</h4>
          </div>
          <p className="text-xl font-bold text-zinc-900">Prophet + XGBoost</p>
          <p className="text-sm text-zinc-500 mt-1">Hybrid Residual Model</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Info size={20} />
            </div>
            <h4 className="font-semibold">Dataset</h4>
          </div>
          <p className="text-xl font-bold text-zinc-900">Walmart Retail</p>
          <p className="text-sm text-zinc-500 mt-1">Kaggle Store Sales Data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Demand Forecast vs Actual</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" height={36}/>
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={false} 
                  name="Actual Sales"
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  strokeDasharray="5 5" 
                  dot={false} 
                  name="Forecasted"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
          <h3 className="text-xl font-bold">Dataset Insights</h3>
          <div>
            <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Source</h4>
            <p className="text-zinc-700 font-medium">Walmart Recruiting - Store Sales Forecasting (Kaggle)</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Why this dataset?</h4>
            <ul className="text-sm text-zinc-600 space-y-2">
              <li className="flex gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Seasonality:</strong> Perfect for testing Prophet's holiday and weekly components.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Exogenous Factors:</strong> Includes markdowns, fuel prices, and CPI.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Resume Value:</strong> Solves a multi-billion dollar inventory optimization problem.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="prose prose-zinc max-w-none bg-zinc-50 p-8 rounded-2xl border border-zinc-200">
        <h3 className="text-zinc-900">Technical Approach</h3>
        <p className="text-zinc-600">
          We implemented a <strong>Hybrid Forecasting Model</strong>. First, we used <strong>Facebook Prophet</strong> to capture the strong weekly and yearly seasonality inherent in retail data. The residuals (errors) from the Prophet model were then passed to an <strong>XGBoost Regressor</strong>.
        </p>
        <ul className="text-zinc-600">
          <li><strong>Feature Engineering:</strong> Lagged variables (t-7, t-30), rolling averages, and holiday flags.</li>
          <li><strong>Hyperparameter Tuning:</strong> Bayesian Optimization for XGBoost parameters.</li>
          <li><strong>Validation Strategy:</strong> Time-series cross-validation (Expanding Window).</li>
        </ul>
      </div>
    </div>
  );
};
