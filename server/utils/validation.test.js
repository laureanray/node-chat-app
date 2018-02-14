const expect = require('expect');
const {isRealString} = require('./validation');

describe('Validate test', () => {

    it('Should reject non-string values', () => {
        let str = 123;
        expect(isRealString(str)).toBe(false);
    });

    it('Should reject string with only spaces', () => {
        let str = '     ';
        expect(isRealString(str)).toBe(false);
    });

    it('Should allow string with non-space character', () => {
        let str = '   sample text';
        expect(isRealString(str)).toBe(true);
    });

});