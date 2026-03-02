# Data Science Portfolio Hub

A professional data science portfolio featuring high-impact projects in Demand Forecasting and MLOps.

## 📊 Projects Overview

### 1. Demand Forecasting (Hybrid Model)
- **Objective**: Predict weekly store sales with high precision.
- **Model**: Hybrid Prophet + XGBoost.
- **Dataset**: [Walmart Recruiting - Store Sales Forecasting](https://www.kaggle.com/c/walmart-recruiting-store-sales-forecasting)
- **Why this dataset?**: 
    - **Seasonality**: Retail sales exhibit strong periodic patterns (weekly, holiday-driven) which are perfect for testing Prophet's seasonality components.
    - **Complexity**: The presence of external factors like markdowns and fuel prices allows for advanced feature engineering.
    - **Real-world Impact**: Demand forecasting is a core business problem in retail, making it a strong resume highlight.

### 2. End-to-End MLOps System
- **Objective**: Build a production-ready predictive maintenance pipeline.
- **Features**: Real-time inference, model monitoring, and drift detection.
- **Architecture**: Express.js backend for inference, React frontend for monitoring, and simulated CI/CD integration.

---

## 🚀 How to Publish to GitHub

Follow these steps to host this project on your own GitHub account:

1. **Create a new repository** on [GitHub](https://github.com/new). Do not initialize with a README.
2. **Open your terminal** in the project root directory.
3. **Initialize Git**:
   ```bash
   git init
   ```
4. **Add all files**:
   ```bash
   git add .
   ```
5. **Commit your changes**:
   ```bash
   git commit -m "Initial commit: Data Science Portfolio Hub"
   ```
6. **Link to GitHub**:
   *(Replace `your-username` and `your-repo-name` with your actual details)*
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   ```
7. **Push to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

---

## 🛠️ Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Set Environment Variables**:
   Create a `.env` file and add your `GEMINI_API_KEY`.
3. **Run the App**:
   ```bash
   npm run dev
   ```
