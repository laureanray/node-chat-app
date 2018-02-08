const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');
describe('Generate Message', () => {
    it('Should generate correct message object', () => {
        let from = "Laurean Ray";
        let text = "Somrthing";
        let message = generateMessage(from, text);
        expect(message.from).toEqual(from);
        expect(message.text).toEqual(text);
        expect(message.createdAt).toBeA('number'); 
        
    });
});

describe('Generate Location Message', () => {
    it('Should generate correct location object', () => {
        let from = "Laurean Ray";
        let latitude = 1;
        let longitude = 1;
        let locationMessage = generateLocationMessage(from, latitude, longitude);
        expect(locationMessage.from).toEqual(from);
        expect(locationMessage.url).toEqual(`https://www.google.com/maps?q=${latitude},${longitude}`);
        expect(locationMessage.createdAt).toBeA('number');
    });
}); 