var express = require('express');
var router = express.Router();
var path = require('path');
const upload = require('../middlewares/multer');
const XLSX = require("xlsx");

router.get('/', function(req, res, next) {
  res.render('index')
});

router.post("/excel", upload.single('myFile') ,function(req,res,next){
  var excelname = req.file.filename;
  var somePath = "./public/"+excelname;
  var resolvedPath = path.resolve(somePath);
  let workbook = XLSX.readFile(resolvedPath);
  let worksheet = workbook.Sheets["sheet2"]
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval : "" });
  
  for(var i = 0; i< jsonData.length; i++) {
    var jsonda = Object.values(jsonData[i]);
    var jsonli = [];
      for (var j = 0 ; j < jsonda.length; j++){
        jsonli = jsonda[j];
        console.log(jsonli)
      }
      console.log("");
  }
 
  res.send("succes")
})

module.exports = router;
