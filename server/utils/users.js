[{
    id: 'qwrfawfoabfjouvgb3',
    name: 'Haha',
    room: 'Ewan'
}]

class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room, unique){
        let user = {id, name, room, unique};
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        let user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
    getUser (id) {
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList (room) {
        let users = this.users.filter((user) => {
            return user.room === room
        });
        let namesArray = users.map((user) =>  user.name);
        return namesArray;
    }
}

module.exports = {Users};




// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} years old`;
//     }
// }

// let me = new Person('Laurean Ray', 18);
// let description = me.getUserDescription();
// console.log(description);

