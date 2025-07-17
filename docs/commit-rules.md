# Commit Rule

This document outlines the guidelines for writing commit messages in this
repository.

Following these rules helps maintain consistency and clarity across the
project's history.

Check [.cz-config](../.cz-config.js) or
[commitlint.config.js](../commitlint.config.js) for basic rules such as message
length and modifiers.

## Contents

- [Format](#format)
- [Tools](#tools)

## Format

1. **Basic Commitments**

```gitcommit
<type>(<scope?>): <subject>

<body>

<footer?>
```

OR

```gitcommit
<type>(<scope?>): <subject>(#<pull_request_number>)

<body>

<footer?>
```

> [!NOTE]
>
> This is the minimal format!

2. **Squash Merge Commit**

```gitcommit
<type>(<scope?>): <subject>(#<pull_request_number>)

<body>

---
<username> --> <type>(<scope>): <subject>
OR
<username> --> <type>(<scope>): <subject>(#<pull_request_number>)

...<Include all other related commits>
---

<footer?>
```

> [!WARNING]
>
> You can track it by checking the PullRequest, but it is recommended not to
> omit the part enclosed in `---` as much as possible.

## Tools

A function is already provided for interactive commits following these rules.

```sh
yarn commit
```

> [!NOTE]
>
> When a commit is executed, the rules are automatically checked. If an error
> occurs with `git commit`, it is recommended to commit using the above method.
