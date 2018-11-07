var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jason';
        var text = 'Hello';

        var res = generateMessage(from, text);
        // console.log(res);
        expect(res).toMatchObject({from, text});
        expect(typeof res.createdAt).toBe('number');

    });
});