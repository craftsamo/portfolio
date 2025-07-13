# Branch strategy

**type**: Github flow

![Branch Strategy](./images/branch-strategy.png)

**Branches**:

| Name      | Description                                               | Branch Source | Merge Target |
| --------- | --------------------------------------------------------- | ------------- | ------------ |
| main      | A stable branch that maintains the production environment | None          | None         |
| develop   | A branch for integrating code under development           | main          | main         |
| <type>/\* | A branch used for developing new <type>                   | develop       | develop      |
| hotfix/\* | A branch used for urgent bug fixes                        | main          | main         |

**The following values can be used for <type>**:

- feat
- enhance
- fix
- doc

## Workflow

**Create a new feature**:

1. Create feat/\* from the develop branch.
2. Make the necessary code changes and add commits.
3. Collaborate with other developers and request a code review as needed.
4. Once the code review is complete, merge into the develop branch.
5. After development is finished, delete the branch.

**Fix a bug**:

1. Create hotfix/\* from the main branch.
2. Make the necessary code changes to fix the bug.
3. Test the fixed code and verify its functionality.
4. Collaborate with other developers and request a code review as needed.
5. After the code review is complete, merge into the main branch.
6. After the fix is complete, delete the branch.

## Things to do before issuing a Pull Request

![Rebase Guide](./images/rebase-guide.png)

Regularly executing `git rebase {base_branch}` provides the following benefits:

1. The history becomes linear, making development management concise and clear.
2. Ensures rapid consistency between `main` and `develop`.
3. Minimizes conflicts and collisions among developers' work.
4. Reflects hotfix content in develop, preventing future conflicts or
   inconsistencies.

## Merge Methods

1. **develop -> main**: Use Merge to organize commit history while merging the
   develop branch into the main branch.
2. **hotfix -> main**: Use SquashMerge to retain commit history while
   integrating the hotfix branch into the main branch.
3. **feat -> develop**: Use SquashMerge to integrate the feat branch into the
   develop branch.
4. **feat -> feat**: Use RebaseMerge or SquashMerge to linearize the history
   while integrating feat branches with each other.
