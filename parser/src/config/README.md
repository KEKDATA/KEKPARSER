На текущий момент env нужны, пока нет бекенда  
START_URL - имеет два типа:
1) Парсинг твитов именно, например https://twitter.com/search?q=html
2) Парсинг конкретной страницы https://mobile.twitter.com/zachleat?lang=en

TWEETS_COUNT - Содержит число твитов, максимальное, для парсинга
  
TWITTER_PARSE_TARGET: 
1) profile - Цель парсинга профиля, связан с START_URL профиля
2) tweets - Парсинг твитов, START URL п. 2

PROFILE_TAB навигация профиля парсинга:
1) Likes - Вкладка Likes профиля
2) Tweets - Дефолтная вкладка профиля
3) TweetsAndReplies - Tweets and Replies вкладка
4) Media - Вкладка Media
