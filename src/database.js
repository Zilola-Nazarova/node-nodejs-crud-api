class User {
  constructor (id, username, age, hobbies) {
    this.id = id;
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }

  update (username, age, hobbies) {
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
    return this;
  }
}

class Database {
  #users;

  constructor () {
    this.#users = [];
  }

  createUser (id, username, age, hobbies) {
    const user = new User(id, username, age, hobbies);
    this.#users.push(user);
    return user;
  }

  getUsers () {
    return this.#users;
  }

  getUser (userId) {
    return this.#users.find(user => user.id === userId);
  }

  removeUser (userIndex) {
    return this.#users.splice(userIndex, 1)[0];
  }

  updateUser (userId, username, age, hobbies) {
    return this.#users
      .find(user => user.id === userId)
      .update(username, age, hobbies);
  }
}

export default Database;
