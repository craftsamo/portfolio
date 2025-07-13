# Turborepo Starter

Welcome to the Turborepo Starter repository! This project serves as a
boilerplate to streamline the development of Turborepo applications with best
practices and curated configurations.

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Internal Packages](#internal-packages)
- [Branch Strategy](#branch-strategy)
- [Sync Label](#sync-labels)
- [Releases](#releases)
- [Commit Rules](#commit-rules)

## Installation

To set up the repository, run:

```sh
yarn install
```

## Usage

### Linting

Run the ESLint checks:

```sh
yarn lint
```

### Testing

Run tests with Jest:

```sh
yarn test
```

### Commit Messages

Use the interactive commit message tool:

```sh
yarn commit
```

This README consolidates all relevant information for contributors and
developers working on this repository.

## Internal Packages

This repository contains several internal packages tailored for specific
purposes:

### TypeScript Configurations

- **Description**: Shared TypeScript configurations.
- **Details**: Refer to [tsconfig README](packages/tsconfig/README.md).

### ESLint Configurations

- **Description**: Linting configurations for various frameworks.
- **Details**: Refer to [eslint README](packages/eslint/README.md).

### Prettier Configurations

- **Description**: Formatting rules for consistent code style.
- **Details**: Refer to [prettier README](packages/prettier/README.md).

### Jest Configurations

- **Description**: Testing configurations for unit and integration tests.
- **Details**: Refer to [jest README](packages/jest/README.md).

### UI Configurations

- **Description**: Common UI package.
- **Details**: Refer to [ui README](packages/ui/README.md).

## Branch Strategy

Refer to the [branch strategy](docs/branch-strategy.md) for detailed workflows,
branch descriptions, and merge methods.

## Sync Labels

Automates the synchronization of labels with the repository. Refer to
[sync labels documentation](docs/sync-labels.md) for configuration and
workflows.

## Releases

This project includes a workflow that automatically generates release notes. For
more details, refer to [releases](/docs/releases.md).

## Commit Rules

We follow strict commit message guidelines to ensure clarity and traceability.
For detailed rules and examples, see [commit guidelines](docs/commit.md).
