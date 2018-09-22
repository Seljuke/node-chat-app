class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        this.users.push({id, name, room});
        return this.users[this.users.length-1];
    }
    removeUser (id) {
        for(var i=0; i< this.users.length; i++){
            if(this.users[i].id === id){
                return this.users.splice(i, 1)[0];
            }
        }
        return undefined;
        // var user = this.getUser(id);
        // if(user){
        //     this.users = this.users.filter((user) => user.id != id);
        // }
        // return user;
    }

    getUser (id) {
        // for(var i=0; i< this.users.length; i++){
        //     if(this.users[i].id === id){
        //         return this.users[i];
        //     }
        // }
        // return null;
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};
