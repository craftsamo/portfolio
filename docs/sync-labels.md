# Sync Labels

A method to effectively synchronize [labels](../.github/labels.yml) used in Pull
Requests and Issues is incorporated.

## Contents

- [Categories](#categories)
- [Synchronizing Defined Labels](#synchronizing-defined-labels)

## Categories

[labels](../.github/labels.yml) are divided into the following groups:

| Category         | Label Names                           | Usage Location                |
| ---------------- | ------------------------------------- | ----------------------------- |
| Action           | e.g., 🌱feature, ⚒️enhancement        | Pull Request, Issues, Release |
| Target           | 🌐app:\*, 📦package:\*, 🔄workflow:\* | Pull Request, Issues          |
| Version Resolver | 🌟major                               | Pull Request                  |

By appropriately assigning labels to each category, the following benefits can
be achieved:

1. **Clear Classification**: Pull requests and issues are clearly categorized,
   making project management easier.
2. **Quick Response**: Labels enable swift identification of relevant issues and
   pull requests.
3. **Enhanced Consistency**: Unified rules for label usage across the team
   facilitate consistent operations.
4. **Analysis and Reporting**: Leveraging labels for filtering and analyzing
   data simplifies tracking project progress.

This allows the project to be managed more efficiently and systematically.

> [!WARNING]
>
> Note that deleting labels defined as
> [Version Resolver](/docs/releases.md#version-resolver) may cause automatic
> releases to malfunction.

## Synchronizing Defined Labels

To synchronize the predefined labels, execute
[sync-labels.yml](../.github/workflows/sync-labels.yml) on
[Github](https://github.com/) or run `gh workflows run "Sync Labels"`.

> [!WARNING]
>
> Note that existing labels will be completely overwritten.
>
> To disable this setting, change `prune: false`.
