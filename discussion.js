const fetch = require('node-fetch');

const token = process.env.GITHUB_TOKEN;
const apiUrl = 'https://api.github.com/graphql';

const query = `
  mutation CreateDiscussion($repositoryId: ID!, $categoryId: ID!, $title: String!, $body: String!) {
    createDiscussion(input: {
      repositoryId: $repositoryId,
      categoryId: $categoryId,
      title: $title,
      body: $body
    }) {
      discussion {
        id
      }
    }
  }
`;

(async () => {
  try {
    // Replace with your repository and category IDs
    const repositoryId = 'YOUR_REPOSITORY_ID';
    const categoryId = 'YOUR_CATEGORY_ID';

    const variables = {
      repositoryId,
      categoryId,
      title: 'Discussion Title',
      body: 'Discussion Body',
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    const discussionId = data.data.createDiscussion.discussion.id;

    console.log(`Discussion created with ID: ${discussionId}`);
  } catch (error) {
    console.error('Failed to create discussion:', error);
    process.exit(1);
  }
})();
