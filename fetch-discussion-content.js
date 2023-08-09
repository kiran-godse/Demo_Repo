// main.js
const { Octokit } = require('@octokit/rest');

try {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const context = JSON.parse(process.env.GITHUB_CONTEXT);
  const discussionNumber = context.payload.discussion.number;

  // Fetch the content of the discussion
  const discussion = await octokit.rest.discussions.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    discussion_number: discussionNumber,
  });

  // Print the content of the discussion
  console.log(`Discussion Content:\n${discussion.data.body}`);
} catch (error) {
  console.error('Error:', error);
}
