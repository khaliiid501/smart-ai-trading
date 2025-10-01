# Smart AI Trading Platform - Dockerfile
# Multi-stage build for React frontend and Python backend

# ====================================
# Stage 1: Build React Frontend
# ====================================
FROM node:18-alpine AS frontend-builder

# Set working directory
WORKDIR /app/frontend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy frontend source code
COPY *.js *.css ./
COPY public/ ./public/ || true
COPY src/ ./src/ || true

# Build React app
RUN npm run build || echo "Build step skipped - using existing files"

# ====================================
# Stage 2: Python Backend with Node
# ====================================
FROM python:3.11-slim

# Install Node.js for running React dev server
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy Python requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install additional required packages
RUN pip install --no-cache-dir uvicorn fastapi

# Copy backend source code
COPY *.py ./

# Copy frontend files
COPY package*.json ./
COPY --from=frontend-builder /app/frontend/node_modules ./node_modules
COPY *.js *.css ./
COPY public/ ./public/ || true
COPY src/ ./src/ || true

# Create necessary directories
RUN mkdir -p /app/data /app/logs

# Expose ports
# 3000 for React frontend
# 8000 for Python backend (FastAPI/Uvicorn)
EXPOSE 3000 8000

# Environment variables
ENV PYTHONUNBUFFERED=1
ENV NODE_ENV=production
ENV PORT=8000
ENV REACT_APP_API_URL=http://localhost:8000

# Create startup script
RUN echo '#!/bin/bash\n\
echo "بدء خادم Backend... | Starting Backend server..."\n\
uvicorn main:app --host 0.0.0.0 --port 8000 &\n\
echo "بدء خادم Frontend... | Starting Frontend server..."\n\
npm start\n\
' > /app/start.sh && chmod +x /app/start.sh

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8000/ || exit 1

# Start both services
CMD ["/bin/bash", "/app/start.sh"]
