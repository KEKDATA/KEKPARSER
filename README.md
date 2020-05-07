![KEKPARSER](https://sun1-24.userapi.com/gAJQi1_LJLZ4crC__NV8e3Do7iDi8XL59j6RSg/3sLlRLjqoP4.jpg)

WIP

---

Для Tweets: TWEETS_COUNT, START_URL - будут задаваться по запуску скрипта в будущем

Установка зависимостей 
1) npm install

Запуск парсинга твитов

Создаем сразу js файлы с указанными параметрами транспиляции в бабеле
2) npm run tsc
3) npm run tweets-parse-babel

или храним в памяти и сразу работаем с ts файлами
2) npm run tweets-parse-ts



-----

page.evaluate - инъекция скрипта, вследствие чего изолирован и не имеет доступа к зависимостям проекта (например константы или хелперы)
