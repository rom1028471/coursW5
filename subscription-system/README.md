# Система управления подписками

Система для управления подписками на журналы и газеты с использованием Spring Boot и React.

## Технологии

### Backend
- Java 17
- Spring Boot 2.7.0
- PostgreSQL
- Spring Data JPA
- Spring Validation
- Swagger/OpenAPI
- Caffeine Cache

### Frontend
- React
- Material-UI
- Axios
- React Router

## Запуск проекта

### Через Docker (рекомендуется)
1. Убедитесь, что у вас установлены Docker и Docker Compose
2. Клонируйте репозиторий
3. Запустите:
```bash
docker-compose up --build
```

Приложение будет доступно:
- Frontend: http://localhost:80
- Backend API: http://localhost:8080/api
- Swagger UI: http://localhost:8080/api/swagger-ui.html
- База данных: localhost:5432

### Локальный запуск

#### Backend
1. Установите Java 17 и Maven
2. Настройте PostgreSQL и создайте базу данных
3. Обновите application.properties при необходимости
4. Запустите:
```bash
mvn spring-boot:run
```

#### Frontend
1. Установите Node.js
2. Перейдите в директорию frontend
3. Установите зависимости:
```bash
npm install
```
4. Запустите:
```bash
npm start
```

## API Документация
Swagger UI доступен по адресу: http://localhost:8080/api/swagger-ui.html

## Основные функции
- Регистрация и управление профилем пользователя
- Просмотр и поиск публикаций
- Управление подписками
- Отслеживание доставок
- Управление платежами
- История операций
- Автопродление подписок
- Уведомления о доставках

## Мониторинг
Actuator endpoints доступны по адресу: http://localhost:8080/api/actuator
- /health - состояние приложения
- /info - информация о приложении
- /metrics - метрики приложения

## Разработка

### Структура проекта
```
subscription-system/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/subscription/
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── dto/
│   │   │       ├── model/
│   │   │       ├── repository/
│   │   │       └── service/
│   │   └── resources/
│   └── test/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── docker-compose.yml
```

### Работа с Git
1. Создайте feature branch:
```bash
git checkout -b feature/название-функционала
```
2. Внесите изменения
3. Создайте pull request

## Troubleshooting

### Общие проблемы
1. **Ошибка подключения к БД**
   - Проверьте настройки в application.properties
   - Убедитесь, что PostgreSQL запущен
   - Проверьте права доступа

2. **Ошибки сборки Frontend**
   - Удалите node_modules и package-lock.json
   - Выполните npm install заново

3. **Проблемы с Docker**
   - Проверьте логи: docker-compose logs
   - Перезапустите Docker Desktop
   - Очистите Docker cache
