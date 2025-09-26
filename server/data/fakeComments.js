import { faker } from "@faker-js/faker";

export const generateComments = (count = 200, postCount = 100) => {
  let comments = [];
  for (let i = 0; i < count; i++) {
    comments.push({
      id: i + 1,
      postId: faker.number.int({ min: 1, max: postCount }),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      body: faker.lorem.sentence(),
    });
  }
  return comments;
};
