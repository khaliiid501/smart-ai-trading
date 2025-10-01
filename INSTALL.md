# 📥 دليل التثبيت والإعداد | Installation & Setup Guide

## Smart AI Trading Platform

هذا الدليل يوفر خطوات مفصلة لتثبيت وتشغيل منصة التداول الذكي بالذكاء الاصطناعي.

This guide provides detailed steps to install and run the Smart AI Trading Platform.

---

## 📋 المتطلبات الأساسية | Prerequisites

قبل البدء، تأكد من تثبيت الأدوات التالية على نظامك:

Before starting, ensure you have the following tools installed on your system:

- **Node.js** >= 14.0.0
- **npm** >= 6.0.0
- **Python** >= 3.8
- **pip** (Python package manager)
- **Git** (version control)
- **Docker** (اختياري | optional - للتشغيل بالحاوية)

### التحقق من التثبيت | Verify Installation

```bash
node --version
npm --version
python --version
pip --version
git --version
```

---

## 🚀 الطريقة الأولى: التثبيت التقليدي | Method 1: Traditional Installation

### الخطوة 1: استنساخ المستودع | Step 1: Clone Repository

```bash
git clone https://github.com/khaliiid501/smart-ai-trading.git
cd smart-ai-trading
```

### الخطوة 2: إعداد قاعدة البيانات | Step 2: Database Setup

إذا كان المشروع يتطلب قاعدة بيانات:

If the project requires a database:

```bash
# إنشاء قاعدة بيانات SQLite (مثال)
# Create SQLite database (example)
python -c "import sqlite3; conn = sqlite3.connect('trading.db'); conn.close()"

# أو تشغيل سكريبت إعداد قاعدة البيانات
# Or run database setup script
python setup_database.py  # إذا كان موجودًا | if exists
```

### الخطوة 3: تثبيت تبعيات Frontend | Step 3: Install Frontend Dependencies

```bash
npm install
```

هذا سيثبت جميع الحزم المطلوبة المذكورة في `package.json`:

This will install all required packages listed in `package.json`:

- React 18.2.0
- Chart.js 4.4.0
- react-chartjs-2 5.2.0
- Axios 1.6.0

### الخطوة 4: تثبيت تبعيات Backend | Step 4: Install Backend Dependencies

```bash
pip install -r requirements.txt
```

أو إذا كنت تستخدم بيئة افتراضية (موصى به):

Or if using a virtual environment (recommended):

```bash
# إنشاء البيئة الافتراضية | Create virtual environment
python -m venv venv

# تفعيل البيئة الافتراضية | Activate virtual environment
# على Windows | On Windows:
venv\Scripts\activate

# على Linux/Mac | On Linux/Mac:
source venv/bin/activate

# تثبيت التبعيات | Install dependencies
pip install -r requirements.txt
```

### الخطوة 5: إعداد المتغيرات البيئية | Step 5: Environment Variables Setup

إنشاء ملف `.env` في الجذر:

Create a `.env` file in the root directory:

```bash
# مثال على المتغيرات البيئية | Example environment variables
API_KEY=your_api_key_here
DATABASE_URL=sqlite:///trading.db
PORT=8000
REACT_APP_API_URL=http://localhost:8000
```

### الخطوة 6: تشغيل Backend (Uvicorn) | Step 6: Run Backend (Uvicorn)

إذا كنت تستخدم FastAPI مع Uvicorn:

If using FastAPI with Uvicorn:

```bash
# في نافذة طرفية جديدة | In a new terminal window
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

أو إذا كنت تستخدم Python مباشرة:

Or if using Python directly:

```bash
python main.py
```

سيعمل الخادم على: `http://localhost:8000`

The server will run at: `http://localhost:8000`

### الخطوة 7: تشغيل Frontend (React) | Step 7: Run Frontend (React)

في نافذة طرفية جديدة:

In a new terminal window:

```bash
npm start
```

سيفتح المتصفح تلقائيًا على: `http://localhost:3000`

The browser will automatically open at: `http://localhost:3000`

---

## 🐳 الطريقة الثانية: التشغيل بالحاوية (Docker) | Method 2: Docker Container

### المتطلبات | Requirements

- Docker Desktop مثبت | Docker Desktop installed
- Docker Compose (اختياري | optional)

### الخطوة 1: بناء صورة Docker | Step 1: Build Docker Image

```bash
docker build -t smart-ai-trading .
```

### الخطوة 2: تشغيل الحاوية | Step 2: Run Container

```bash
docker run -d -p 3000:3000 -p 8000:8000 --name trading-app smart-ai-trading
```

### الخطوة 3: التحقق من التشغيل | Step 3: Verify Running

```bash
docker ps
docker logs trading-app
```

### إيقاف وإزالة الحاوية | Stop and Remove Container

```bash
docker stop trading-app
docker rm trading-app
```

### استخدام Docker Compose (موصى به) | Using Docker Compose (Recommended)

إذا كان لديك ملف `docker-compose.yml`:

If you have a `docker-compose.yml` file:

```bash
# تشغيل جميع الخدمات | Start all services
docker-compose up -d

# عرض السجلات | View logs
docker-compose logs -f

# إيقاف الخدمات | Stop services
docker-compose down
```

---

## 🔧 إعدادات إضافية | Additional Configuration

### إعداد API Keys

إذا كنت تستخدم API خارجي للبيانات:

If using external API for data:

1. احصل على API Key من المزود (مثل Binance، CoinGecko)
2. أضفها إلى ملف `.env`
3. أعد تشغيل Backend

### إعداد قاعدة البيانات المتقدمة | Advanced Database Setup

لقاعدة بيانات PostgreSQL:

For PostgreSQL database:

```bash
# تثبيت psycopg2 | Install psycopg2
pip install psycopg2-binary

# تحديث DATABASE_URL في .env | Update DATABASE_URL in .env
DATABASE_URL=postgresql://user:password@localhost:5432/trading_db
```

---

## ✅ التحقق من التثبيت | Verify Installation

### اختبار Backend

```bash
curl http://localhost:8000
# أو زيارة | or visit: http://localhost:8000/docs
```

### اختبار Frontend

افتح المتصفح وانتقل إلى:

Open browser and navigate to:

```
http://localhost:3000
```

يجب أن ترى:

You should see:

- ✅ لوحة المعلومات التفاعلية | Interactive Dashboard
- ✅ الرسوم البيانية للأسعار | Price Charts
- ✅ إشارات التداول | Trading Signals
- ✅ الإحصائيات الحالية | Current Statistics

---

## 🐛 حل المشاكل الشائعة | Troubleshooting

### مشكلة: Port مستخدم بالفعل | Problem: Port Already in Use

```bash
# إيقاف العملية على Port 3000 | Kill process on Port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

### مشكلة: فشل تثبيت npm | Problem: npm Install Fails

```bash
# حذف المجلد وإعادة التثبيت | Delete folder and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### مشكلة: خطأ Python modules | Problem: Python Module Errors

```bash
# تحديث pip | Update pip
pip install --upgrade pip

# إعادة تثبيت التبعيات | Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### مشكلة: CORS Errors

تأكد من إعدادات CORS في Backend:

Ensure CORS settings in Backend:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📚 مراجع إضافية | Additional Resources

- [React Documentation](https://react.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)

---

## 🆘 الحصول على المساعدة | Getting Help

إذا واجهت أي مشاكل:

If you encounter any issues:

1. تحقق من السجلات (logs) | Check the logs
2. راجع قسم حل المشاكل أعلاه | Review troubleshooting section above
3. افتح Issue على GitHub | Open an issue on GitHub
4. تواصل مع المطور | Contact the developer: [@khaliiid501](https://github.com/khaliiid501)

---

## 📄 الترخيص | License

MIT License - حقوق النشر © 2025 khaliiid501

---

**ملاحظة هامة:** هذا المشروع للأغراض التعليمية. استخدمه بحذر في التداول الحقيقي.

**Important Note:** This project is for educational purposes. Use with caution in real trading.
