# Releases

The workflow for automatically drafting and updating release notes is
integrated.

> [!NOTE]
>
> This feature is triggered by merging into the `main` branch.

## Contents

- [Template](#template)
- [Categories](#categories)
- [Version Resolver](#version-resolver)
- [Automatically Label Pull Requests](#automatically-label-pull-requests)

## Template

The release note template is specified in the following items of
[release-drafter.yml](../.github/release-drafter.yml).

- **Title**: The title of the release is specified by `name-template`.
- **Tag**: The version tag of the release is specified by `tag-template`.
- **Change Template**: The format of the changes is specified by
  `change-template`.
- **Body Template**: The body template of the release is specified by
  `template`.

## Categories

You can specify the categories to be automatically included in the release
contents with `categories`.

`labels` must be predefined in [labels](../.github/labels.yml) and synchronized
with the repository.

## Version Resolver

**Versioning Configuration**: `{major}.{minor}.{patch}`

The version of the next release will increment the corresponding part based on
the label attached to the first pull request merged after the previous release
was published.

| Label           | Type  |
| --------------- | ----- |
| 🌟major         | major |
| 🌱feature       | minor |
| 🐞hotfix        | minor |
| 📝documentation | patch |
| ⚒️enhancement   | patch |
| 🐛bug           | patch |

## Automatically Label Pull Requests

If a label is not attached to a Pull Request, it will not function correctly. To
reduce the possibility of such occurrences,
[assign-labels.yml](../.github/workflows/assign-labels.yml) has been prepared.

[assign-labels.yml](../.github/workflows/assign-labels.yml) automatically
assigns the appropriate Action label based on the
[branch](/docs/branch-strategy.md#valid-type) name when a Pull Request is
created.

You can also configure rules in the `autolabeler` of
[release-drafter.yml](../.github/release-drafter.yml) to assign labels at the
same timing as `assign-labels.yml`.
