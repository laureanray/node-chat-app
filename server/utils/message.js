const moment = require('moment');
const {download} = require('./download');
const randomstring = require("randomstring");
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
};

var generateLocationMessage = (from, latitude, longitude, callback) => {
    let APP_ID = 'fYlbMsK1wbElAWZCeH2e';
    let APP_CODE = 'VvaylvgaA-03wjKxc7PoaA';
    let date = new Date().getUTCDate();
    let value = date + '__' + randomstring.generate(10);
   
    download(`https://image.maps.cit.api.here.com/mia/1.6/mapview?app_id=${APP_ID}&app_code=${APP_CODE}&lat=${latitude}&lon=${longitude}&z=16&w=940&h=320`,
     `public/img/_temp/${value}.jpeg`, function(){
        console.log('done');
        let createdAt = moment().valueOf();
        callback(from, createdAt, value);
      
    });   
   

};

module.exports = {generateMessage, generateLocationMessage};