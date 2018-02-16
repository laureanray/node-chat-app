const fs = require('fs');
const express = require('express');
const request = require('request');
let app = express();

let get_uri = "https://image.maps.cit.api.here.com/mia/1.6/mapview?app_id=fYlbMsK1wbElAWZCeH2e&app_code=VvaylvgaA-03wjKxc7PoaA&lat=14.5908759&lon=121.0128087&z=14";


let download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download(get_uri, 'mapview.jpeg', function(){
  console.log('done');
});