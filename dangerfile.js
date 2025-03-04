import { message, danger, fail, warn } from "danger"

const modifiedMD = danger.git.modified_files.join("- ");
message("Changed Files in this PR: \n - " + modifiedMD);


if (!danger.github.pr.assignee) {
    const method = danger.github.pr.title.includes("WIP") ? warn : fail;
    method("This pull request needs an assignee, and optionally include any reviewers.");
}

if (danger.github.pr.body && danger.github.pr.body.length < 10) {
    fail("This pull request needs a description.");
}