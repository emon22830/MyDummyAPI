import { faker } from "@faker-js/faker";

export const generateUsers = (count = 50) => {
  let users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      id: i + 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      address: faker.location.streetAddress(),
    });
  }
  return users;
};
