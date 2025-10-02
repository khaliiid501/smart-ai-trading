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
import TradeTable from './TradeTable';
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

  // دالة لتوليد بيانات تجريبية
  const generateMockData = () => {
    const data = [];
    const basePrice = 50000;
    for (let i = 0; i < 24; i++) {
      data.push({
        time: `${i}:00`,
        price: basePrice + Math.random() * 5000 - 2500,
        volume: Math.random() * 1000000000
      });
    }
    return data;
  };

  // دالة لتوليد إشارات تجريبية
  const generateMockSignals = () => {
    return [
      {
        type: 'buy',
        confidence: 85,
        price: 49500,
        time: '10:30'
      },
      {
        type: 'sell',
        confidence: 78,
        price: 51200,
        time: '14:45'
      },
      {
        type: 'buy',
        confidence: 92,
        price: 48800,
        time: '18:15'
      }
    ];
  };

  // إعدادات الرسوم البيانية
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        ticks: {
          color: '#a0aec0'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#a0aec0'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  // بيانات رسم الأسعار
  const priceChartData = {
    labels: priceData.map(d => d.time),
    datasets: [
      {
        label: 'السعر (USD)',
        data: priceData.map(d => d.price),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  };

  // بيانات رسم الحجم
  const volumeChartData = {
    labels: priceData.map(d => d.time),
    datasets: [
      {
        label: 'حجم التداول',
        data: priceData.map(d => d.volume),
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1
      }
    ]
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
    <div className="App">
      {/* رأسية التطبيق - App Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo-icon">🤖</span>
            <h1>Smart AI Trading</h1>
          </div>
          <div className="header-subtitle">
            منصة التداول الذكي بالذكاء الاصطناعي
          </div>
        </div>
      </header>

      <main className="app-main">
        {/* قسم إشارات التداول - Trading Signals Section */}
        <section className="signals-section">
          <h2>📊 إشارات التداول النشطة</h2>
          <div className="signals-grid">
            {signals.map((signal, index) => (
              <div 
                key={index} 
                className={`signal-card ${ signal.type === 'buy' ? 'buy-signal' : 'sell-signal'}`}
              >
                <div className="signal-header">
                  <span className="signal-icon">
                    {signal.type === 'buy' ? '📈' : '📉'}
                  </span>
                  <span className="signal-type">
                    {signal.type === 'buy' ? 'شراء' : 'بيع'}
                  </span>
                </div>
                <div className="signal-body">
                  <div className="signal-price">
                    ${signal.price.toLocaleString()}
                  </div>
                  <div className="signal-confidence">
                    <span>الثقة:</span>
                    <span className="confidence-value">{signal.confidence}%</span>
                  </div>
                  <div className="signal-time">⏰ {signal.time}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* قسم الرسوم البيانية - Charts Section */}
        <section className="charts-section">
          <div className="chart-container">
            <h3>📈 رسم بياني للأسعار</h3>
            <div className="chart-wrapper">
              <Line data={priceChartData} options={chartOptions} />
            </div>
          </div>

          <div className="chart-container">
            <h3>📊 رسم بياني لحجم التداول</h3>
            <div className="chart-wrapper">
              <Bar data={volumeChartData} options={chartOptions} />
            </div>
          </div>
        </section>

        {/* قسم جدول التداولات - Trade Table Section */}
        <section className="trade-table-section">
          <TradeTable />
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
        © 2025 Smart AI Trading - جميع الحقوق محفوظة
      </footer>
    </div>
  );
}

export default App;
