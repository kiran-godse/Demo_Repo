const { Octokit } = require('@octokit/rest');

async function fetchDiscussionContent() {
  try {
    const octokit = new Octokit({
      auth: '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',
    });

    // Access the discussion number from the event payload
    const discussionNumber = github.event.discussion.number;

    // Fetch the content of the discussion
    const discussion = await octokit.rest.discussions.get({
      owner: 'kiran-godse',  
      repo: 'Demo_Repo',   
      discussion_number: discussionNumber,
    });

    // Print the content of the discussion
    console.log(`Discussion Content:\n${discussion.data.body}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the async function to initiate the action logic
fetchDiscussionContent();
