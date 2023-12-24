![logo](./avatar/bggtop1000.png)

# BGG Top 1000

This bot posts [BGG Top 1000](https://boardgamegeek.com/browse/boardgame) changes to [@bggtop1000](https://t.me/bggtop1000) every week.

bucket and schedulers setup:

```bash
gcloud storage buckets create gs://boardgamegeek --location=us-central1
gcloud scheduler jobs create http bgg-top1000-bot --location=us-central1 --schedule="0 9 * * 6" --uri="https://us-central1-zinovik-project.cloudfunctions.net/bgg-top1000-bot?channelId=@bggtop1000&isDevMode=off" --oidc-service-account-email=zinovik-project@appspot.gserviceaccount.com --http-method=get --oidc-token-audience="https://us-central1-zinovik-project.cloudfunctions.net/bgg-top1000-bot"
gcloud scheduler jobs create http bgg-top1000-bot-dev --location=us-central1 --schedule="0 15 * * 5" --uri="https://us-central1-zinovik-project.cloudfunctions.net/bgg-top1000-bot?channelId=446618160&isDevMode=on" --oidc-service-account-email=zinovik-project@appspot.gserviceaccount.com --http-method=get --oidc-token-audience="https://us-central1-zinovik-project.cloudfunctions.net/bgg-top1000-bot"
```
