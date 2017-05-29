var express = require('express')
var app = express()

require('dotenv').config()
var request = require('request');
var cheerio = require('cheerio');
var pipe = require('pipe');

var Scraper = require ('images-scraper')
var bing = new Scraper.Bing();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.send("this is not where you want to be");
});

app.get('/:emotion', function(req, res) {
  
  var searchTerm = req.params.emotion + " monkey gif";
  console.log("searching for " + searchTerm);

  bing.list({
    keyword: searchTerm,
    num: 10,
    detail: true
  })
  .then(function (results) {
    //callback for search
    var resultIndex = Math.floor(Math.random() * (9 + 1));
    var monkeyUrl = results[resultIndex].url;
    request(monkeyUrl).pipe(res);
//    res.send(results[resultIndex].url);
    
  }).catch(function(err) {
    console.log('err',err);
  })
  
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
