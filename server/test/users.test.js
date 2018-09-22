const expect = require("expect");

var {Users} = require("../utils/users");

describe("Users Class", () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "first",
            room: "firstRoom"
        }, {
            id: "2",
            name: "second",
            room: "secondRoom"
        }, {
            id: "3",
            name: "third",
            room: "firstRoom"
        }]
    });

    it("should add user properly", () => {
        var users = new Users();
        var user = {
            id: "123",
            name: "trialName",
            room: "trialRoom"
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it("should return names for firstRoom", () => {
        var userList = users.getUserList("firstRoom");

        expect(userList).toEqual(["first", "third"]);
    });
    it("should return names for secondRoom", () => {
        var userList = users.getUserList("secondRoom");

        expect(userList).toEqual(["second"]);
    });
    it("should get user", () => {
        var user = users.getUser("1");

        expect(user).toMatchObject(users.users[0]);
    });
    it("should remove user", () => {
        var user = users.removeUser("2");

        expect(user).toMatchObject({id: "2",name: "second",room: "secondRoom"});
        expect(users.users.length).toBe(2);
    });
    it("should not get user", () => {
        var user = users.getUser("4");
        expect(user).toBeUndefined();
    });
    it("should not remove user", () => {
        var user = users.removeUser("4");
        expect(user).toBeUndefined();
    });
});