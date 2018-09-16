const expect = require("expect");

var {generateMessage} = require("./message");


describe("generateMessage", () => {
    it("should generate correct message object", () => {
        var message = generateMessage("someone", "something");
        expect(message).toMatchObject({from: "someone",text: "something"});
        expect(typeof message.createdAt).toBe("number");
    });
});