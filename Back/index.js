const app = require('./src/app');
const config = require('./src/config')

var server = app.listen(config.app.port, function () {
   var port = server.address().port
   console.log("Candlestick api listening at http://localhost:%s", port)
})
