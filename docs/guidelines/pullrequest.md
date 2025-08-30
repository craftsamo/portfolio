# Pull Request

## Create pull request

1. The title must begin with a verb (e.g., Add xx, Fix xx, Enable xx), be within
   50 characters, and summarize the result of `git diff {base_branch}`

1. If [PULL_REQUEST_TEMPLATE.md](../../.github/PULL_REQUEST_TEMPLATE.md) or
   [pull_request_template.md](../../.github/pull_request_template.md) exists,
   complete the content according to that file.

2-1. If it does not exist, execute `gh pr view {pr_number} --json body` to refer
to the three most recent Pull Requests and determine the most appropriate
format.

3. Run `git log -n 5` to understand the language used in recent commits.

4. The body of the Pull Request should be carefully analyzed based on the
   content of `git diff {base_branch}` and written accordingly.

