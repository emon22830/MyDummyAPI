import { faker } from "@faker-js/faker";

export const generatePosts = (count = 100, userCount = 50) => {
  let posts = [];
  for (let i = 0; i < count; i++) {
    posts.push({
      id: i + 1,
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      userId: faker.number.int({ min: 1, max: userCount }),
    });
  }
  return posts;
};
