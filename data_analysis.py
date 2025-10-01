# data_analysis.py
# تحليل البيانات والربط بالمؤشرات العالمية
# هذا الملف يحتوي على كود لجمع بيانات الأسواق وربطها بمؤشرات الاقتصاد العالمي

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import requests
from typing import Dict, List, Optional

class MarketDataAnalyzer:
    """
    كلاس تحليل بيانات السوق
    يجمع ويحلل بيانات الأسواق المالية ويربطها بالمؤشرات الاقتصادية العالمية
    """
    
    def __init__(self, api_key: Optional[str] = None):
        """
        تهيئة محلل البيانات
        :param api_key: مفتاح API للوصول إلى بيانات السوق (مثل Alpha Vantage أو Yahoo Finance)
        """
        self.api_key = api_key
        self.market_data = None
        self.economic_indicators = {}
    
    def fetch_market_data(self, symbol: str, period: str = '1y') -> pd.DataFrame:
        """
        جلب بيانات السوق للرمز المحدد
        :param symbol: رمز السهم أو العملة (مثل AAPL، EURUSD)
        :param period: الفترة الزمنية (1d، 5d، 1mo، 3mo، 6mo، 1y، 2y، 5y، 10y، ytd، max)
        :return: DataFrame يحتوي على بيانات السوق
        """
        try:
            # في بيئة إنتاجية، يمكن استخدام yfinance أو API آخر
            # import yfinance as yf
            # data = yf.download(symbol, period=period)
            
            # بيانات تجريبية للتوضيح
            dates = pd.date_range(end=datetime.now(), periods=365, freq='D')
            data = pd.DataFrame({
                'Date': dates,
                'Open': np.random.randn(365).cumsum() + 100,
                'High': np.random.randn(365).cumsum() + 102,
                'Low': np.random.randn(365).cumsum() + 98,
                'Close': np.random.randn(365).cumsum() + 100,
                'Volume': np.random.randint(1000000, 10000000, 365)
            })
            data.set_index('Date', inplace=True)
            
            self.market_data = data
            return data
            
        except Exception as e:
            print(f"خطأ في جلب بيانات السوق: {e}")
            return pd.DataFrame()
    
    def get_global_economic_indicators(self) -> Dict[str, float]:
        """
        جلب المؤشرات الاقتصادية العالمية
        يتضمن: أسعار الفائدة، التضخم، البطالة، الناتج المحلي الإجمالي
        :return: قاموس يحتوي على المؤشرات الاقتصادية
        """
        # في بيئة إنتاجية، يمكن استخدام APIs مثل:
        # - FRED (Federal Reserve Economic Data)
        # - World Bank API
        # - IMF Data
        
        # بيانات تجريبية
        indicators = {
            'interest_rate_us': 5.25,  # سعر الفائدة الأمريكي
            'interest_rate_eu': 4.50,  # سعر الفائدة الأوروبي
            'inflation_rate': 3.2,     # معدل التضخم
            'unemployment_rate': 3.8,  # معدل البطالة
            'gdp_growth': 2.1,         # نمو الناتج المحلي الإجمالي
            'oil_price': 85.50,        # سعر النفط (برميل)
            'gold_price': 2050.00,     # سعر الذهب (أونصة)
            'vix_index': 15.5          # مؤشر الخوف VIX
        }
        
        self.economic_indicators = indicators
        return indicators
    
    def calculate_correlation_with_indicators(self, market_data: pd.DataFrame) -> Dict[str, float]:
        """
        حساب الارتباط بين بيانات السوق والمؤشرات العالمية
        :param market_data: بيانات السوق
        :return: قاموس يحتوي على معاملات الارتباط
        """
        correlations = {}
        
        # مثال: حساب الارتباط مع مؤشرات افتراضية
        if not market_data.empty:
            # توليد بيانات مؤشرات افتراضية لنفس الفترة
            market_data['Interest_Rate'] = np.random.randn(len(market_data)).cumsum() + 5
            market_data['Inflation'] = np.random.randn(len(market_data)).cumsum() + 3
            
            # حساب الارتباطات
            correlations['price_vs_interest_rate'] = market_data['Close'].corr(market_data['Interest_Rate'])
            correlations['price_vs_inflation'] = market_data['Close'].corr(market_data['Inflation'])
            correlations['volume_vs_volatility'] = market_data['Volume'].corr(market_data['Close'].pct_change().abs())
        
        return correlations
    
    def analyze_market_sentiment(self, data: pd.DataFrame) -> str:
        """
        تحليل معنويات السوق بناءً على حركة الأسعار والحجم
        :param data: بيانات السوق
        :return: نص يصف معنويات السوق
        """
        if data.empty:
            return "لا توجد بيانات كافية لتحليل المعنويات"
        
        # حساب المتوسطات المتحركة قصيرة وطويلة المدى
        recent_avg = data['Close'].tail(10).mean()
        long_term_avg = data['Close'].mean()
        
        # حساب التقلب (Volatility)
        volatility = data['Close'].pct_change().std() * 100
        
        # تحديد معنويات السوق
        if recent_avg > long_term_avg * 1.02:
            sentiment = "صاعد بقوة (Bullish)"
        elif recent_avg > long_term_avg:
            sentiment = "صاعد (Moderately Bullish)"
        elif recent_avg < long_term_avg * 0.98:
            sentiment = "هابط بقوة (Bearish)"
        else:
            sentiment = "هابط (Moderately Bearish)"
        
        return f"معنويات السوق: {sentiment} | التقلب: {volatility:.2f}%"
    
    def get_key_statistics(self, data: pd.DataFrame) -> Dict[str, float]:
        """
        حساب الإحصائيات الرئيسية للسوق
        :param data: بيانات السوق
        :return: قاموس يحتوي على الإحصائيات
        """
        if data.empty:
            return {}
        
        stats = {
            'current_price': data['Close'].iloc[-1],
            'avg_price': data['Close'].mean(),
            'max_price': data['Close'].max(),
            'min_price': data['Close'].min(),
            'price_change': ((data['Close'].iloc[-1] - data['Close'].iloc[0]) / data['Close'].iloc[0]) * 100,
            'avg_volume': data['Volume'].mean(),
            'volatility': data['Close'].pct_change().std() * 100,
            'sharpe_ratio': self._calculate_sharpe_ratio(data['Close'])
        }
        
        return stats
    
    def _calculate_sharpe_ratio(self, prices: pd.Series, risk_free_rate: float = 0.02) -> float:
        """
        حساب نسبة شارب (Sharpe Ratio) - مقياس للعائد المعدل حسب المخاطر
        :param prices: سلسلة الأسعار
        :param risk_free_rate: معدل العائد الخالي من المخاطر (افتراضي 2%)
        :return: نسبة شارب
        """
        returns = prices.pct_change().dropna()
        excess_returns = returns - (risk_free_rate / 252)  # 252 يوم تداول في السنة
        
        if returns.std() == 0:
            return 0
        
        sharpe = np.sqrt(252) * (excess_returns.mean() / returns.std())
        return sharpe
    
    def generate_analysis_report(self, symbol: str) -> str:
        """
        توليد تقرير تحليلي شامل
        :param symbol: رمز السهم أو العملة
        :return: تقرير نصي شامل
        """
        # جلب البيانات
        market_data = self.fetch_market_data(symbol)
        
        if market_data.empty:
            return "فشل في جلب البيانات"
        
        # الحصول على المؤشرات
        indicators = self.get_global_economic_indicators()
        correlations = self.calculate_correlation_with_indicators(market_data.copy())
        sentiment = self.analyze_market_sentiment(market_data)
        stats = self.get_key_statistics(market_data)
        
        # بناء التقرير
        report = f"""
========================================
تقرير التحليل الشامل للرمز: {symbol}
تاريخ التقرير: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
========================================

1. الإحصائيات الرئيسية:
   - السعر الحالي: ${stats['current_price']:.2f}
   - التغير: {stats['price_change']:.2f}%
   - أعلى سعر: ${stats['max_price']:.2f}
   - أدنى سعر: ${stats['min_price']:.2f}
   - التقلب: {stats['volatility']:.2f}%
   - نسبة شارب: {stats['sharpe_ratio']:.2f}

2. معنويات السوق:
   {sentiment}

3. المؤشرات الاقتصادية العالمية:
   - سعر الفائدة الأمريكي: {indicators['interest_rate_us']}%
   - سعر الفائدة الأوروبي: {indicators['interest_rate_eu']}%
   - معدل التضخم: {indicators['inflation_rate']}%
   - مؤشر VIX: {indicators['vix_index']}
   - سعر النفط: ${indicators['oil_price']}
   - سعر الذهب: ${indicators['gold_price']}

4. تحليل الارتباطات:
   - الارتباط مع أسعار الفائدة: {correlations.get('price_vs_interest_rate', 0):.2f}
   - الارتباط مع التضخم: {correlations.get('price_vs_inflation', 0):.2f}

========================================
        """
        
        return report

# مثال على الاستخدام
if __name__ == "__main__":
    # إنشاء محلل البيانات
    analyzer = MarketDataAnalyzer()
    
    # توليد تقرير شامل
    report = analyzer.generate_analysis_report('AAPL')
    print(report)
    
    # عرض المؤشرات العالمية
    print("\nالمؤشرات الاقتصادية العالمية:")
    indicators = analyzer.get_global_economic_indicators()
    for key, value in indicators.items():
        print(f"  {key}: {value}")
