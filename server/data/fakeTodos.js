import { faker } from "@faker-js/faker";

export const generateTodos = (count = 100, userCount = 50) => {
  let todos = [];
  for (let i = 0; i < count; i++) {
    todos.push({
      id: i + 1,
      title: faker.lorem.words(),
      completed: faker.datatype.boolean(),
      userId: faker.number.int({ min: 1, max: userCount }),
    });
  }
  return todos;
};
