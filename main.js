const { Octokit } = require('@octokit/rest');

async function fetchDiscussionContent() {
  try {
    const octokit = new Octokit({
      auth: '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',
    });

    const discussionNumber = process.env.INPUT_DISCUSSION_NUMBER;

    const discussion = await octokit.rest.discussions.get({
      owner: 'kiran-godse',
      repo: 'Demo_Repo',
      discussion_number: discussionNumber,
    });

    const discussionContent = discussion.data.body;
    console.log(`Discussion Content:\n${discussionContent}`);

    // Set the discussion content as an output
    console.log(`::set-output name=discussion_content::${discussionContent}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Call the async function to initiate the action logic
fetchDiscussionContent();



