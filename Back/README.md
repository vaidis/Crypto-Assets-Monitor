# Crypto Assets Monitor (Backend)

## Download

```bash
git clone https://github.com/vaidis/Crypto-Assets-Monitor.git
```

## Install

```bash
cd CryptoAssets-Monitor/Back
npm install
```

## Run

```bash
npm start
```

## Endpoints

```bash
GET /kraken/assets
GET /kraken/assetpairs?asset=BTC
GET /kraken/ohlc?pair=XXBTCUSDT&interval=60
```

## Test Endpoints
```bash
curl --location --request GET 'http://localhost:8080/kraken/assets'
curl --location --request GET 'http://localhost:8080/kraken/assetpairs?asset=XBT'
curl --location --request GET 'http://localhost:8080/kraken/ohlc?pair=XXBTZEUR&interval=60'
```

or import the [postman_collection.json](./postman_collection.json) to postman rest api client
