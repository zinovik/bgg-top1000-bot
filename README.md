![logo](./avatar/bggtop1000.png)

# BGG Top 1000

This bot posts [BGG Top 1000](https://boardgamegeek.com/browse/boardgame) changes to [@bggtop1000](https://t.me/bggtop1000) every week.

## google cloud setup

### create bucket:

```bash
gcloud storage buckets create gs://boardgamegeek --location=us-central1
gcloud storage buckets update gs://boardgamegeek --versioning
```

### create schedulers

```bash
gcloud scheduler jobs create http bgg-top1000-bot --location=us-central1 --schedule="0 9 * * 6" --uri="https://us-central1-zinovik-project.cloudfunctions.net/bgg-top1000-bot?channelId=@bggtop1000&isDevMode=off" --oidc-service-account-email=zinovik-project@appspot.gserviceaccount.com --http-method=get --oidc-token-audience="https://us-central1-zinovik-project.cloudfunctions.net/bgg-top1000-bot"

gcloud scheduler jobs create http bgg-top1000-bot-dev --location=us-central1 --schedule="0 15 * * 5" --uri="https://us-central1-zinovik-project.cloudfunctions.net/bgg-top1000-bot?channelId=446618160&isDevMode=on" --oidc-service-account-email=zinovik-project@appspot.gserviceaccount.com --http-method=get --oidc-token-audience="https://us-central1-zinovik-project.cloudfunctions.net/bgg-top1000-bot"
```

### create service account

```bash
gcloud iam service-accounts create github-actions
```

### add roles (`Service Account User` and `Cloud Functions Admin`) to the service account you want to use to deploy the function

```
gcloud projects add-iam-policy-binding zinovik-project --member="serviceAccount:github-actions@zinovik-project.iam.gserviceaccount.com" --role="roles/cloudfunctions.admin"

gcloud projects add-iam-policy-binding zinovik-project --member="serviceAccount:github-actions@zinovik-project.iam.gserviceaccount.com" --role="roles/iam.serviceAccountUser"
```

### creating keys for service account for github-actions `GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY_FILE`

```bash
gcloud iam service-accounts keys create key-file.json --iam-account=github-actions@appspot.gserviceaccount.com
cat key-file.json | base64
```

### add access to secrets

```
gcloud projects add-iam-policy-binding zinovik-project --member="serviceAccount:306312319198-compute@developer.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
```

### add secrets

```
printf "TELEGRAM_TOKEN" | gcloud secrets create bgg-top1000-bot-telegram-token --locations=us-central1 --replication-policy="user-managed" --data-file=-
```
