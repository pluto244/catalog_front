# Этап 1: Сборка React-приложения
FROM node:18-alpine AS build

WORKDIR /app

# Копируем package.json и yarn.lock для установки зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем остальные файлы проекта
COPY . .

# Собираем production-билд
RUN yarn build

# Этап 2: Настройка Nginx для раздачи статики
FROM nginx:1.21.0-alpine

# Копируем собранные файлы из этапа сборки
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомную конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80 для входящих соединений
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"] 