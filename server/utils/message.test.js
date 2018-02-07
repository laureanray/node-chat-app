const expect = require('expect');
var {generateMessage} = require('./message');
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