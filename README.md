[![Build Status](https://travis-ci.org/zinovik/bgg-top1000-bot.svg?branch=master)](https://travis-ci.org/zinovik/bgg-top1000-bot)

![logo](./avatar/bggtop1000.png)

# BGG Top 1000

This bot posts [BGG Top 1000](https://boardgamegeek.com/browse/boardgame) changes to [@bggtop1000](https://t.me/bggtop1000) every week.

---

## Working locally

### 1. create and fill .env file (use .env.example for help)

### 2. start the project

You can start project as lambda function:

```bash
npm run start:dev
```

### 3. you can invoke the function locally

```bash
curl localhost:3000/api/message?token=
```
