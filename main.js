const core = require('@actions/core');
const github = require('@actions/github');

async function fetchDiscussionContent() {
  try {
    const token = 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
    const octokit = github.getOctokit(token);

    const discussionNumber = core.getInput('discussion_number');

    const discussion = await octokit.rest.discussions.get({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      discussion_number: discussionNumber,
    });

    const discussionContent = discussion.data.body;
    console.log(`Discussion Content:\n${discussionContent}`);

    core.setOutput('discussion_content', discussionContent);
  } catch (error) {
    core.setFailed(`Error: ${error.message}`);
  }
}

// Call the async function to initiate the action logic
fetchDiscussionContent();

