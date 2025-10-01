# 🤖 Smart AI Trading Platform

## نظرة عامة | Overview

منصة التداول الذكي بالذكاء الاصطناعي - تطبيق تداول متطور يستخدم الذكاء الاصطناعي لتحليل السوق وتوليد إشارات التداول.

Smart AI Trading Platform - An advanced trading application that uses artificial intelligence to analyze markets and generate trading signals.

## 🎨 واجهة المستخدم | User Interface

### المكونات الرئيسية | Main Components

#### 1. **لوحة المعلومات التفاعلية | Interactive Dashboard**
   - عرض البيانات في الوقت الفعلي
   - Real-time data visualization
   - واجهة مستخدم عصرية وسهلة الاستخدام
   - Modern and user-friendly interface

#### 2. **الرسوم البيانية | Charts**
   - **رسم بياني للأسعار**: يعرض تحركات أسعار العملات الرقمية مع الوقت
   - **Price Chart**: Displays cryptocurrency price movements over time
   - **رسم بياني للحجم**: يعرض حجم التداول لكل فترة زمنية
   - **Volume Chart**: Shows trading volume for each time period
   - مدعوم بمكتبة Chart.js لعرض بيانات احترافية
   - Powered by Chart.js for professional data visualization

#### 3. **إشارات التداول | Trading Signals**
   - إشارات الشراء والبيع مع مستوى الثقة
   - Buy and sell signals with confidence levels
   - عرض السعر المقترح ووقت الإشارة
   - Display suggested price and signal timing
   - تصميم بصري واضح مع الألوان (أخضر للشراء، أحمر للبيع)
   - Clear visual design with colors (green for buy, red for sell)

#### 4. **الإحصائيات الحالية | Current Statistics**
   - السعر الحالي | Current Price
   - الحجم اليومي | Daily Volume
   - عدد الإشارات النشطة | Active Signals Count
   - آخر تحديث | Last Update Time

### 📊 التقنيات المستخدمة | Technologies Used

#### Frontend Technologies:
- **React 18.2.0**: مكتبة JavaScript لبناء واجهات المستخدم
- **Chart.js 4.4.0**: مكتبة الرسوم البيانية التفاعلية
- **react-chartjs-2 5.2.0**: مكون React لـ Chart.js
- **Axios 1.6.0**: للتواصل مع API وجلب البيانات
- **CSS3**: للتصميم والتنسيق

#### Backend Technologies:
- **Python**: للتحليل والذكاء الاصطناعي
- **Data Analysis**: تحليل بيانات السوق
- **Trading Strategies**: استراتيجيات التداول الآلي

## 🚀 التثبيت والتشغيل | Installation & Setup

### المتطلبات الأساسية | Prerequisites
```bash
Node.js >= 14.0.0
npm >= 6.0.0
Python >= 3.8
```

### خطوات التثبيت | Installation Steps

1. **استنساخ المستودع | Clone the repository**
```bash
git clone https://github.com/khaliiid501/smart-ai-trading.git
cd smart-ai-trading
```

2. **تثبيت التبعيات | Install dependencies**
```bash
# Frontend dependencies
npm install

# Backend dependencies
pip install -r requirements.txt
```

3. **تشغيل التطبيق | Run the application**
```bash
# Start React frontend
npm start

# Start Python backend (في نافذة أخرى | in another terminal)
python main.py
```

## 📦 الملفات الرئيسية | Main Files

- **App.js**: المكون الرئيسي للواجهة مع الرسوم البيانية
- **package.json**: تبعيات المشروع والإعدادات
- **main.py**: نقطة البداية للنظام الخلفي
- **data_analysis.py**: تحليل بيانات السوق
- **strategy.py**: استراتيجيات التداول

## 🎯 المميزات | Features

✅ تحليل السوق في الوقت الفعلي | Real-time market analysis
✅ رسوم بيانية تفاعلية احترافية | Professional interactive charts
✅ إشارات تداول ذكية | Smart trading signals
✅ واجهة مستخدم باللغتين العربية والإنجليزية | Bilingual UI (Arabic/English)
✅ تحديث تلقائي للبيانات كل 30 ثانية | Auto-refresh every 30 seconds
✅ عرض الإحصائيات الحالية | Current statistics display
✅ تصميم متجاوب (Responsive Design)

## 📱 معاينة الواجهة | UI Preview

الواجهة تحتوي على:
- رأسية (Header) مع عنوان المنصة
- قسم إشارات التداول مع بطاقات ملونة
- رسمان بيانيان: أحدهما خطي للأسعار والآخر أعمدة للحجم
- قسم الإحصائيات مع 4 بطاقات معلومات
- تذييل (Footer) مع معلومات حقوق النشر

## 🔧 التخصيص | Customization

يمكن تخصيص:
- الألوان والتصميم عبر ملف App.css
- مصدر البيانات من خلال تعديل axios endpoint
- فترة التحديث التلقائي (حاليًا 30 ثانية)
- إعدادات الرسوم البيانية عبر chartOptions

## 📄 الترخيص | License

MIT License - حقوق النشر © 2025 khaliiid501

## 👤 المطور | Developer

**khaliiid501**
- GitHub: [@khaliiid501](https://github.com/khaliiid501)

## 🤝 المساهمة | Contributing

المساهمات مرحب بها! يرجى فتح Issue أو Pull Request.

Contributions are welcome! Please open an Issue or Pull Request.

---

**ملاحظة**: هذا المشروع للأغراض التعليمية. استخدمه بحذر في التداول الحقيقي.

**Note**: This project is for educational purposes. Use with caution in real trading.
