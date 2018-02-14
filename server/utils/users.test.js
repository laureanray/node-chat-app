const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Jean',
      room: 'React Course'
    },{
      id: '3',
      name: 'July',
      room: 'Node Course'
    }];
  });


  it('Should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Laurean',
      room: 'The Office Fans'
    };
    let resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]); 
  });

  it('Should remove user', () => {
    let userId = '1';
    let user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('Should not remove user', () => {
    let userId = '6';
    let user = users.removeUser(userId);

    expect(user).toNotExist;
    expect(users.users.length).toBe(3);
  });

  it('Should find user', () => {
    let id = '1';
    let user = users.getUser(id);
    expect(user.id).toBe(id);
  });

  it('Should not find', () => {
    let id = '99';
    let user = users.getUser(id);
    expect(user).toNotExist();
  });

  it('Should return names for node course', () => {
    let userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'July']);
  });

  it('Should return names for react course', () => {
    let userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jean']);
  });
});