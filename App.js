import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import './App.css';

// تسجيل مكونات Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [priceData, setPriceData] = useState([]);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب بيانات الأسعار من API
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/market-data');
        setPriceData(response.data.prices);
        setSignals(response.data.signals);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // استخدام بيانات تجريبية في حالة الخطأ
        setPriceData(generateMockData());
        setSignals(generateMockSignals());
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // تحديث كل 30 ثانية

    return () => clearInterval(interval);
  }, []);

  // توليد بيانات تجريبية
  const generateMockData = () => {
    const data = [];
    const now = Date.now();
    for (let i = 30; i >= 0; i--) {
      data.push({
        timestamp: new Date(now - i * 3600000).toISOString(),
        price: 50000 + Math.random() * 5000,
        volume: Math.random() * 1000000
      });
    }
    return data;
  };

  const generateMockSignals = () => {
    return [
      { type: 'buy', price: 52000, timestamp: new Date().toISOString(), confidence: 0.85 },
      { type: 'sell', price: 53500, timestamp: new Date().toISOString(), confidence: 0.78 }
    ];
  };

  // إعداد بيانات الرسم البياني للأسعار
  const priceChartData = {
    labels: priceData.map(d => new Date(d.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })),
    datasets: [
      {
        label: 'السعر (USD)',
        data: priceData.map(d => d.price),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      }
    ]
  };

  // إعداد بيانات الرسم البياني للحجم
  const volumeChartData = {
    labels: priceData.map(d => new Date(d.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })),
    datasets: [
      {
        label: 'الحجم',
        data: priceData.map(d => d.volume),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'تحليل السوق المباشر'
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>جاري تحميل البيانات...</p>
      </div>
    );
  }

  return (
    <div className="App" dir="rtl">
      <header className="app-header">
        <h1>🤖 Smart AI Trading Platform</h1>
        <p className="subtitle">منصة التداول الذكي بالذكاء الاصطناعي</p>
      </header>

      <main className="dashboard">
        {/* قسم الإشارات */}
        <section className="signals-section">
          <h2>إشارات التداول 📊</h2>
          <div className="signals-grid">
            {signals.map((signal, index) => (
              <div key={index} className={`signal-card ${signal.type}`}>
                <div className="signal-type">
                  {signal.type === 'buy' ? '🟢 شراء' : '🔴 بيع'}
                </div>
                <div className="signal-price">
                  السعر: ${signal.price.toLocaleString()}
                </div>
                <div className="signal-confidence">
                  الثقة: {(signal.confidence * 100).toFixed(0)}%
                </div>
                <div className="signal-time">
                  {new Date(signal.timestamp).toLocaleString('ar-SA')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* قسم الرسوم البيانية */}
        <section className="charts-section">
          <div className="chart-container">
            <h3>رسم بياني للأسعار</h3>
            <div className="chart-wrapper">
              <Line data={priceChartData} options={chartOptions} />
            </div>
          </div>

          <div className="chart-container">
            <h3>رسم بياني لحجم التداول</h3>
            <div className="chart-wrapper">
              <Bar data={volumeChartData} options={chartOptions} />
            </div>
          </div>
        </section>

        {/* قسم الإحصائيات */}
        <section className="stats-section">
          <h2>الإحصائيات الحالية 📈</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">السعر الحالي</div>
              <div className="stat-value">
                ${priceData.length > 0 ? priceData[priceData.length - 1].price.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '0'}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">الحجم اليومي</div>
              <div className="stat-value">
                {priceData.length > 0 ? (priceData[priceData.length - 1].volume / 1000000).toFixed(2) : '0'}M
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">عدد الإشارات</div>
              <div className="stat-value">{signals.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">آخر تحديث</div>
              <div className="stat-value">
                {new Date().toLocaleTimeString('ar-SA')}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2025 Smart AI Trading - جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}

export default App;
