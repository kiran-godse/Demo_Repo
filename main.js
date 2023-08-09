const { Octokit } = require('@octokit/rest');

try {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const discussionNumber = process.env.DISCUSSION_NUMBER;

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
