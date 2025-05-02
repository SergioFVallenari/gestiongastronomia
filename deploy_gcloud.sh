#!/bin/bash
gcloud config set project donfaustino
gcloud auth configure-docker \
    southamerica-west1-docker.pkg.dev
docker build -t southamerica-west1-docker.pkg.dev/donfaustino/donfaustino/donfaustinoar:latest .
docker push southamerica-west1-docker.pkg.dev/donfaustino/donfaustino/donfaustinoar:latest

gcloud run deploy donfaustino \
    --image=southamerica-west1-docker.pkg.dev/donfaustino/donfaustino/donfaustinoar:latest \
    --region=southamerica-west1 \
    --platform=managed \
    --allow-unauthenticated \
    --port=8080