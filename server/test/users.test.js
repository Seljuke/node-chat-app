const expect = require("expect");

const {Users} = require("../utils/users");

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
        let users = new Users();
        let user = {
            id: "123",
            name: "trialName",
            room: "trialRoom"
        };
        let resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it("should return names for firstRoom", () => {
        let userList = users.getUserList("firstRoom");

        expect(userList).toEqual(["first", "third"]);
    });
    it("should return names for secondRoom", () => {
        let userList = users.getUserList("secondRoom");

        expect(userList).toEqual(["second"]);
    });
    it("should get user", () => {
        let user = users.getUser("1");

        expect(user).toMatchObject(users.users[0]);
    });
    it("should remove user", () => {
        let user = users.removeUser("2");

        expect(user).toMatchObject({id: "2",name: "second",room: "secondRoom"});
        expect(users.users.length).toBe(2);
    });
    it("should not get user", () => {
        let user = users.getUser("4");
        expect(user).toBeUndefined();
    });
    it("should not remove user", () => {
        let user = users.removeUser("4");
        expect(user).toBeUndefined();
    });
    it("should return unique rooms", () => {
        let rooms = users.getRoomList();
        expect(rooms).toContain("firstRoom", "secondRoom");
    });
    it("should return true existing user", () => {
        let user = users.checkUserExist("third");
        expect(user).toBeTruthy();
    });
    it("should return false nonexisting user", () => {
        let user = users.checkUserExist("bir");
        expect(user).toBeFalsy();
    });
});