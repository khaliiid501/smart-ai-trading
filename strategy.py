# strategy.py
# استراتيجية التداول الذكي باستخدام المتوسط المتحرك ومؤشر القوة النسبية
# هذا الملف يحتوي على كود أساسي لبناء استراتيجية تداول تعتمد على التحليل الفني

import pandas as pd
import numpy as np
from datetime import datetime

class TradingStrategy:
    """
    كلاس استراتيجية التداول
    يستخدم المتوسط المتحرك (Moving Average) ومؤشر القوة النسبية (RSI)
    لتحديد نقاط الشراء والبيع
    """
    
    def __init__(self, short_window=20, long_window=50, rsi_period=14):
        """
        تهيئة المعاملات الأساسية للاستراتيجية
        :param short_window: فترة المتوسط المتحرك القصير (افتراضي 20)
        :param long_window: فترة المتوسط المتحرك الطويل (افتراضي 50)
        :param rsi_period: فترة حساب مؤشر القوة النسبية (افتراضي 14)
        """
        self.short_window = short_window
        self.long_window = long_window
        self.rsi_period = rsi_period
    
    def calculate_moving_averages(self, data):
        """
        حساب المتوسطات المتحركة البسيطة
        :param data: DataFrame يحتوي على أسعار الإغلاق
        :return: DataFrame مع المتوسطات المتحركة
        """
        data['MA_Short'] = data['Close'].rolling(window=self.short_window).mean()
        data['MA_Long'] = data['Close'].rolling(window=self.long_window).mean()
        return data
    
    def calculate_rsi(self, data):
        """
        حساب مؤشر القوة النسبية (RSI)
        :param data: DataFrame يحتوي على أسعار الإغلاق
        :return: DataFrame مع قيم RSI
        """
        # حساب التغير في السعر
        delta = data['Close'].diff()
        
        # فصل المكاسب والخسائر
        gain = (delta.where(delta > 0, 0)).rolling(window=self.rsi_period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=self.rsi_period).mean()
        
        # حساب RS و RSI
        rs = gain / loss
        data['RSI'] = 100 - (100 / (1 + rs))
        return data
    
    def generate_signals(self, data):
        """
        توليد إشارات الشراء والبيع بناءً على المؤشرات
        :param data: DataFrame مع المؤشرات المحسوبة
        :return: DataFrame مع إشارات التداول
        """
        data['Signal'] = 0
        
        # إشارة شراء: عندما يقطع المتوسط القصير المتوسط الطويل من الأسفل
        # وعندما يكون RSI أقل من 30 (ذروة البيع)
        buy_condition = (
            (data['MA_Short'] > data['MA_Long']) & 
            (data['MA_Short'].shift(1) <= data['MA_Long'].shift(1)) &
            (data['RSI'] < 30)
        )
        data.loc[buy_condition, 'Signal'] = 1  # إشارة شراء
        
        # إشارة بيع: عندما يقطع المتوسط القصير المتوسط الطويل من الأعلى
        # وعندما يكون RSI أكبر من 70 (ذروة الشراء)
        sell_condition = (
            (data['MA_Short'] < data['MA_Long']) & 
            (data['MA_Short'].shift(1) >= data['MA_Long'].shift(1)) &
            (data['RSI'] > 70)
        )
        data.loc[sell_condition, 'Signal'] = -1  # إشارة بيع
        
        return data
    
    def get_recommendation(self, data):
        """
        الحصول على التوصية الحالية بناءً على آخر البيانات
        :param data: DataFrame مع الإشارات
        :return: نص التوصية
        """
        if data.empty:
            return "لا توجد بيانات كافية"
        
        last_signal = data['Signal'].iloc[-1]
        last_price = data['Close'].iloc[-1]
        last_rsi = data['RSI'].iloc[-1]
        
        if last_signal == 1:
            return f"توصية: شراء | السعر: {last_price:.2f} | RSI: {last_rsi:.2f}"
        elif last_signal == -1:
            return f"توصية: بيع | السعر: {last_price:.2f} | RSI: {last_rsi:.2f}"
        else:
            return f"توصية: انتظار | السعر: {last_price:.2f} | RSI: {last_rsi:.2f}"
    
    def run_strategy(self, data):
        """
        تنفيذ الاستراتيجية الكاملة
        :param data: DataFrame مع بيانات الأسعار
        :return: DataFrame مع جميع المؤشرات والإشارات
        """
        # حساب المؤشرات
        data = self.calculate_moving_averages(data)
        data = self.calculate_rsi(data)
        
        # توليد الإشارات
        data = self.generate_signals(data)
        
        return data

# مثال على الاستخدام
if __name__ == "__main__":
    # إنشاء بيانات تجريبية
    dates = pd.date_range(start='2024-01-01', periods=100, freq='D')
    prices = np.random.randn(100).cumsum() + 100
    
    sample_data = pd.DataFrame({
        'Date': dates,
        'Close': prices
    })
    
    # تطبيق الاستراتيجية
    strategy = TradingStrategy()
    result = strategy.run_strategy(sample_data)
    
    # عرض التوصية
    print(strategy.get_recommendation(result))
    print("\nآخر 5 إشارات:")
    print(result[['Date', 'Close', 'MA_Short', 'MA_Long', 'RSI', 'Signal']].tail())
