1) Запустите команду docker-compose build
2) Запустите команду docker-compose up
3) Перейдите по адресу http://localhost:5050/login?next=%2Fbrowser%2F и авторизуйтесь: login: n@n.com, password: root
4) В pgadmin cоздайте новый сервер, название сервера может быть любым, в качестве host name/adress укажите postgres user: admin, пароль: 1234
5) Перейдите в образ main через docker desktop и откройте cli и там пропишите команду npm run typeorm:run-migrations для создания таблиц в БД
6) Перейдите в браузере по адресу http://localhost:3001/api/docs для проверки API