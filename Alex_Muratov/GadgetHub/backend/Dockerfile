FROM node:20-alpine

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь код бэкенда
COPY . .

# Собираем TypeScript (опционально, tsx работает и без сборки)
# RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "dev"]