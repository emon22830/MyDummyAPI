// generateData.js
const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

// handy helpers
const write = (name, data) => {
  fs.writeFileSync(path.join(DATA_DIR, name + '.json'), JSON.stringify(data, null, 2));
};

const generateUsers = (n = 50) => {
  const users = [];
  for (let i = 1; i <= n; i++) {
    users.push({
      id: i,
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      company: { name: faker.company.name() },
      address: {
        street: faker.location.street(),
        suite: `Suite ${faker.number.int({min:1,max:999})}`,
        city: faker.location.city(),
        zipcode: faker.location.zipCode()
      }
    });
  }
  return users;
};

const generatePosts = (n = 100, usersCount = 50) => {
  const posts = [];
  for (let i = 1; i <= n; i++) {
    posts.push({
      id: i,
      userId: faker.number.int({ min: 1, max: usersCount }),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs({ min: 1, max: 3 })
    });
  }
  return posts;
};

const generateComments = (n = 200, postsCount = 100) => {
  const comments = [];
  for (let i = 1; i <= n; i++) {
    comments.push({
      id: i,
      postId: faker.number.int({ min: 1, max: postsCount }),
      name: faker.lorem.words(3),
      email: faker.internet.email(),
      body: faker.lorem.sentences(2)
    });
  }
  return comments;
};

const generateTodos = (n = 100, usersCount = 50) => {
  const todos = [];
  for (let i = 1; i <= n; i++) {
    todos.push({
      id: i,
      userId: faker.number.int({ min: 1, max: usersCount }),
      title: faker.lorem.sentence(),
      completed: faker.datatype.boolean()
    });
  }
  return todos;
};

const users = generateUsers(50);
const posts = generatePosts(100, users.length);
const comments = generateComments(200, posts.length);
const todos = generateTodos(100, users.length);

write('users', users);
write('posts', posts);
write('comments', comments);
write('todos', todos);

console.log('Data generated in /backend/data');
