var express = require('express');
var router = express.Router();
const api_helper = require('./thirdparty_api')
const config = require('./config');



router.get('/kraken/ohlc', function (req, res) {
  let pair = req.query.pair;
  let interval = req.query.interval;
  let url = config.kraken.api_url + '/0/public/OHLC?pair=' + pair + '&interval=' + interval;

  api_helper.REMOTE_API_call(url)
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.send(error)
    })
})



router.get('/kraken/assets', function (req, res) {
  let url = config.kraken.api_url + '/0/public/Assets';

  api_helper.REMOTE_API_call(url)
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.send(error)
    })
})



router.get('/kraken/assetpairs', function (req, res) {
  let asset = req.query.asset;
  let url = config.kraken.api_url + '/0/public/AssetPairs';

  api_helper.REMOTE_API_call(url)
    .then(response => {
      const obj = response.result
      const obj2 = Object.fromEntries(Object.entries(obj).filter(([key]) => key.includes(asset)));
      res.json(obj2);

    })
    .catch(error => {
      res.send(error)
    })
})

module.exports = router;
