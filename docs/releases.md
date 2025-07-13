# Releases

## Release Drafter Workflow

The new release drafter workflow automates the creation of draft releases for
the `main` branch. Key features include:

### Workflow Details

- **Triggers**:
  - Push events to the `main` branch.
  - Pull request events (opened, reopened, synchronize).
- **Setup**:
  - Uses the
    [release-drafter/release-drafter@v6](https://github.com/release-drafter/release-drafter)
    action.
  - Configured with `GITHUB_TOKEN` for authentication.

### Release Notes Format

- **Change Template**:
  - `- $TITLE @$AUTHOR (#$NUMBER)`
- **Version Naming**:
  - Name template: `v$RESOLVED_VERSION 🚀`
  - Tag template: `v$RESOLVED_VERSION`

### Version Resolver

- Labels that trigger version bumps:
  - **Major**: 🌟major
  - **Minor**: 🌱feature, 🐞hotfix
  - **Patch**: 📝documentation, ⚒️enhancement, 🐛bug
  - **Default**: patch

### Categories

- 🚀 New Features: 🌱feature
- ⚒️ Enhancements: ⚒️enhancement
- 🐛 Bug Fixes: 🐛bug, 🐞hotfix
- 📄 Documentation: 📝documentation

### Autolabeler

Labels are automatically applied based on branch naming patterns:

- 📝documentation:
  - Branch patterns: `/doc/, /document/, /documentation/`
  - File patterns: `*.md`
- ⚒️enhancement:
  - Branch patterns: `/improve/, /refactor/, /enhancement/`

### Label Details

These [labels](../.github/labels.yml) are used across workflows for
categorization and version resolution:

- **🌟major**: Indicates a major release update.
- **🌱feature**: Feature addition.
- **🐛bug**: Bug fixes.
- **🐞hotfix**: High urgency bug fixes.
- **📝documentation**: Documentation improvement or addition.
- **⚒️enhancement**: Feature improvement.

---

### Summarized Changes

#### Categories from release-drafter.yml

- **🚀 New Features**: Includes `🌱feature` label.
- **⚒️ Enhancements**: Includes `⚒️enhancement` label.
- **🐛 Bug Fixes**: Includes `🐛bug` and `🐞hotfix` labels.
- **📄 Documentation**: Includes `📝documentation` label.

#### Autolabeler Behavior

- Automatically applies labels based on:
  - **Branch Patterns**:
    - `/doc/, /document/, /documentation/` → `📝documentation`
    - `/improve/, /refactor/, /enhancement/` → `⚒️enhancement`
  - **File Patterns**:
    - `*.md` → `📝documentation`

#### Version Resolver

- **Major bump** triggered by `🌟major` label.
- **Minor bump** triggered by `🌱feature`, `🐞hotfix` labels.
- **Patch bump** triggered by `📝documentation`, `⚒️enhancement`, `🐛bug`
  labels.
- Default bump is set to **patch**.

This workflow enhances release automation and improves clarity in versioning and
labeling processes.
