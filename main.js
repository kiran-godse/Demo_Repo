const { Octokit } = require('@octokit/rest');

async function fetchDiscussionContent() {
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const discussionNumber = process.env.INPUT_DISCUSSION_NUMBER;

    // Fetch the content of the discussion
    const discussion = await octokit.rest.discussions.get({
      owner: context.repo['kiran-godse'], 
      repo: context.repo['Demo_Repo'],   
    });

    // Print the content of the discussion
    console.log(`Discussion Content:\n${discussion.data.body}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the async function to initiate the action logic
fetchDiscussionContent();
