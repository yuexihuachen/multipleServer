var express = require('express');
var router = express.Router();
var fs = require("fs")
var path = require("path")
var pageData = require('../static/page.json')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { 
    title: 'Html', 
    content: 'javascript',
    pageList: Object.keys(pageData.pageList)
  });
});

router.post('/write', function (req, res, next) {
  const params = req.body
  fs.writeFileSync(`./views/${pageData.pageList[params.page]}.hbs`, `
      ${decodeURIComponent(params.html)}
      <script>
      ${decodeURIComponent(params.js)}
      </script>
  `)
  res.status(200).send({ message: 'success' })
})


router.post('/setFile', function (req, res, next) {
  let sampleFile;
  let uploadPath;
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  sampleFile = req.files.sampleFile;
  uploadPath = path.resolve(__dirname, '../filedata/' + sampleFile.name)
  console.log(uploadPath)
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send({
      result: 'File uploaded!'
    });
  });
})

for (const key in pageData.pageList) {
  const value = pageData.pageList[key]
  router.get( `/${key}`, function (req, res, next) {
    res.render(value, {
      title: key
    })
  })
}

// router.get('/read', function (req, res, next) {
//   res.render('demo')
// })

module.exports = router;
