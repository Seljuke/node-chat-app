const expect = require("expect");

var {isRealString} = require("../utils/validation");

describe("isRealString test", () => {
    it("should return false with non-string values", () => {
        expect(isRealString(1234)).toBeFalsy();
        expect(isRealString({name: "wow"})).toBeFalsy();
        expect(isRealString(undefined)).toBeFalsy();
        expect(isRealString(true)).toBeFalsy();
    });
    it("should return false with string contain only spaces", () => {
        expect(isRealString("  ")).toBeFalsy();
        expect(isRealString("")).toBeFalsy();
    });
    it("should return true with non-space chars", () => {
        expect(isRealString("trials")).toBeTruthy();
        expect(isRealString("      tri als      ")).toBeTruthy();
    });
});