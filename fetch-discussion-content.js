const fetch = require('node-fetch');

const token = process.env.GITHUB_TOKEN;
const apiUrl = 'https://api.github.com/graphql';

const query = `
  query GetDiscussionContent($discussionNumber: Int!) {
    discussion(number: $discussionNumber) {
      title
      body
    }
  }
`;

(async () => {
  try {
    const discussionNumber = process.argv[2];

    const variables = {
      discussionNumber: parseInt(discussionNumber),
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
    const discussion = data.data.discussion;

    console.log(`::set-output name=title::${discussion.title}`);
    console.log(`::set-output name=body::${discussion.body}`);
  } catch (error) {
    console.error('Failed to fetch discussion content:', error);
    process.exit(1);
  }
})();
