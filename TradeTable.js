// TradeTable.js - جدول التداولات الديناميكي | Dynamic Trades Table
import React, { useState } from 'react';
import './TradeTable.css';

const TradeTable = () => {
  // بيانات تجريبية للتداولات | Sample trade data
  const [trades, setTrades] = useState([
    { id: 1, type: 'buy', coin: 'BTC', price: 45000, amount: 0.5, date: '2025-10-01 10:30', status: 'مكتمل' },
    { id: 2, type: 'sell', coin: 'ETH', price: 3000, amount: 2.0, date: '2025-10-01 11:15', status: 'مكتمل' },
    { id: 3, type: 'watch', coin: 'BNB', price: 450, amount: 5.0, date: '2025-10-01 12:00', status: 'قيد المراقبة' },
  ]);

  // حالات نموذج الإضافة | Add form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTrade, setNewTrade] = useState({
    type: 'buy',
    coin: '',
    price: '',
    amount: '',
    status: 'مكتمل'
  });

  // إضافة تداول جديد | Add new trade
  const handleAddTrade = (e) => {
    e.preventDefault();
    if (!newTrade.coin || !newTrade.price || !newTrade.amount) {
      alert('الرجاء ملء جميع الحقول | Please fill all fields');
      return;
    }

    const trade = {
      id: trades.length > 0 ? Math.max(...trades.map(t => t.id)) + 1 : 1,
      type: newTrade.type,
      coin: newTrade.coin.toUpperCase(),
      price: parseFloat(newTrade.price),
      amount: parseFloat(newTrade.amount),
      date: new Date().toLocaleString('en-GB', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit' 
      }).replace(',', ''),
      status: newTrade.status
    };

    setTrades([...trades, trade]);
    setNewTrade({ type: 'buy', coin: '', price: '', amount: '', status: 'مكتمل' });
    setShowAddForm(false);
  };

  // حذف تداول | Delete trade
  const handleDeleteTrade = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التداول؟ | Are you sure you want to delete this trade?')) {
      setTrades(trades.filter(trade => trade.id !== id));
    }
  };

  // إرجاع لون الصف حسب نوع العملية | Return row color based on trade type
  const getRowClass = (type) => {
    switch(type) {
      case 'buy':
        return 'trade-row-buy'; // أخضر | Green
      case 'sell':
        return 'trade-row-sell'; // أحمر | Red
      case 'watch':
        return 'trade-row-watch'; // أصفر | Yellow
      default:
        return '';
    }
  };

  // إرجاع نص نوع العملية بالعربي | Return trade type text in Arabic
  const getTypeText = (type) => {
    switch(type) {
      case 'buy':
        return '📈 شراء';
      case 'sell':
        return '📉 بيع';
      case 'watch':
        return '👀 مراقبة';
      default:
        return type;
    }
  };

  return (
    <div className="trade-table-container">
      <div className="trade-table-header">
        <h1 className="trade-table-title">
          📋 جدول التداولات | Trades Table
        </h1>
        <button 
          className="btn-add-trade"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '❌ إلغاء' : '➕ إضافة تداول'}
        </button>
      </div>

      {/* نموذج الإضافة | Add Form */}
      {showAddForm && (
        <form className="add-trade-form" onSubmit={handleAddTrade}>
          <div className="form-group">
            <label>النوع | Type:</label>
            <select 
              value={newTrade.type}
              onChange={(e) => setNewTrade({...newTrade, type: e.target.value})}
            >
              <option value="buy">📈 شراء | Buy</option>
              <option value="sell">📉 بيع | Sell</option>
              <option value="watch">👀 مراقبة | Watch</option>
            </select>
          </div>

          <div className="form-group">
            <label>العملة | Coin:</label>
            <input
              type="text"
              placeholder="BTC, ETH, etc."
              value={newTrade.coin}
              onChange={(e) => setNewTrade({...newTrade, coin: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>السعر | Price ($):</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={newTrade.price}
              onChange={(e) => setNewTrade({...newTrade, price: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>الكمية | Amount:</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={newTrade.amount}
              onChange={(e) => setNewTrade({...newTrade, amount: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>الحالة | Status:</label>
            <select 
              value={newTrade.status}
              onChange={(e) => setNewTrade({...newTrade, status: e.target.value})}
            >
              <option value="مكتمل">✅ مكتمل | Complete</option>
              <option value="قيد المراقبة">⏳ قيد المراقبة | Watching</option>
              <option value="ملغي">❌ ملغي | Cancelled</option>
            </select>
          </div>

          <button type="submit" className="btn-submit">✅ إضافة | Add</button>
        </form>
      )}

      {/* المفتاح | Legend */}
      <div className="trade-table-legend">
        <div className="legend-item">
          <span className="legend-color buy"></span>
          <span>شراء | Buy</span>
        </div>
        <div className="legend-item">
          <span className="legend-color sell"></span>
          <span>بيع | Sell</span>
        </div>
        <div className="legend-item">
          <span className="legend-color watch"></span>
          <span>مراقبة | Watch</span>
        </div>
      </div>

      {/* الجدول | Table */}
      <div className="table-wrapper">
        <table className="trade-table">
          <thead>
            <tr>
              <th>#</th>
              <th>النوع | Type</th>
              <th>العملة | Coin</th>
              <th>السعر | Price</th>
              <th>الكمية | Amount</th>
              <th>الإجمالي | Total</th>
              <th>التاريخ | Date</th>
              <th>الحالة | Status</th>
              <th>إجراءات | Actions</th>
            </tr>
          </thead>
          <tbody>
            {trades.length === 0 ? (
              <tr>
                <td colSpan="9" style={{textAlign: 'center', padding: '20px'}}>
                  لا توجد تداولات | No trades available
                </td>
              </tr>
            ) : (
              trades.map((trade) => (
                <tr key={trade.id} className={getRowClass(trade.type)}>
                  <td>{trade.id}</td>
                  <td className="trade-type">{getTypeText(trade.type)}</td>
                  <td className="trade-coin">{trade.coin}</td>
                  <td className="trade-price">${trade.price.toLocaleString()}</td>
                  <td>{trade.amount}</td>
                  <td className="trade-total">
                    ${(trade.price * trade.amount).toLocaleString(undefined, {maximumFractionDigits: 2})}
                  </td>
                  <td className="trade-date">{trade.date}</td>
                  <td className="trade-status">{trade.status}</td>
                  <td>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteTrade(trade.id)}
                      title="حذف | Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* الملخص | Summary */}
      <div className="trade-table-summary">
        <div className="summary-card">
          <h3>إجمالي عمليات الشراء</h3>
          <p className="summary-value buy-color">{trades.filter(t => t.type === 'buy').length}</p>
        </div>
        <div className="summary-card">
          <h3>إجمالي عمليات البيع</h3>
          <p className="summary-value sell-color">{trades.filter(t => t.type === 'sell').length}</p>
        </div>
        <div className="summary-card">
          <h3>إجمالي عمليات المراقبة</h3>
          <p className="summary-value watch-color">{trades.filter(t => t.type === 'watch').length}</p>
        </div>
        <div className="summary-card">
          <h3>إجمالي التداولات</h3>
          <p className="summary-value total-color">{trades.length}</p>
        </div>
      </div>
    </div>
  );
};

export default TradeTable;
