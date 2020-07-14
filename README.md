# Backend NewsExploler

Ссылка: [NewsExplorer Backend](https://api.newsexp.ml/ "NewsExplorer Backend")
Бэкенд проекта по поиску и хранению новостей.
Версия: v. 0.0.1

### Технологии: 
- JS
- GIT
- Node.js
- MongoDB
- Nginx

### Настройка:

Клонировать [репозиторий](https://github.com/InInferno/news-explorer-api.git)

Установить пакеты

    npm install
    
В проекте присутствует модуль dotenv, поэтому для production сборки необходимо в корне проекта создать конфигурационный файл .env с env-переменными:

    NODE_ENV=production
    JWT_SECRET=key

Для генерации ключа можно воспользоваться командой в консоли:

    node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"

### Запуск:

Запуск mongoDB

      mongod
      
Режим разработки с hotreload

    node run dev
    
Режим production

    node run start

###Запросы:

####Регистрация нового пользователя.
**POST /signup**

Формат тела запроса (JSON):
```json
{
  "name": "User",
  "about": "More about the author",
  "avatar": "https://www.images.com/666",
  "email": "user@gmail.com",
  "password": "123456789"
}
```


####Авторизация пользователя.
**POST /signin**

Формат тела запроса (JSON):
```json
{
  "email": "user@gmail.com",
  "password": "123456789"
}
```


**GET /users/me**

Возвращает инфо о пользователе.


**GET /articles**

Возвращает сохранённые пользователем статьи.


####Сохранение новой статьи.

**POST /articles**

Формат тела запроса (JSON):
```json
{
  "keyword": "Ключевое слово статьи",
  "title": "Заголовок статьи",
  "text": "Текст статьи",
  "date": "01.01.2020",
  "source": "Источник",
  "link": "https://www.news.com/666",
  "image": "https://avatars.mds.yandex.net/get-pdb/236760/82b06d33-f9c2-4066-9565-6da432bae2c5/orig"
}
```


**DEL /articles/articleId**

Удаление статьи по ID.
