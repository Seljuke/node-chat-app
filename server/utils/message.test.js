const expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message");


describe("generateMessage", () => {
    it("should generate correct message object", () => {
        var message = generateMessage("someone", "something");
        expect(message).toMatchObject({from: "someone",text: "something"});
        expect(typeof message.createdAt).toBe("number");
    });
});

describe("generateLocationMessage", () => {
    it("should generate correct location object", () => {
        var message = generateLocationMessage("someone", 1, 2);
        expect(message).toMatchObject({
            from: "someone",
            url: "https://www.google.com/maps?q=1,2"
        });
        expect(typeof message.createdAt).toBe("number");
    });
});