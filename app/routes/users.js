var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getWasmBuffer', function(req, res, next) {
  const params = req.query;
  const wasmCode = fs.readFileSync(`./filedata/${params.fileName}`,{ encoding: null })
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.set({
    'Content-Type': 'application/wasm'
  })
  res.send(wasmCode)
});

module.exports = router;
