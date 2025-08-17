<div align="center">
  <h1>Welcome to the Portfolio!</h1>
</div>

## Contents

- [Branches](#branches)
- [Getting Started](#installation)
- [Internal Packages](#internal-packages)

## Branches

- **main**: A stable branch equipped with minimal features.

## Getting Started

1. **Install Dependencies**

```sh
yarn add -g nps
```

```sh
nps prepare
```

2. **Run Project**

```sh
nps dev
```

For other available commands, please refer to [here](package-scripts.js).

## Internal Packages

This repository contains several internal packages tailored for specific
purposes:

| Package name                              | Description                                            |
| ----------------------------------------- | ------------------------------------------------------ |
| [tsconfig](packages/tsconfig/README.md)   | Shared TypeScript configurations.                      |
| [eslint](packages/eslint/README.md)       | Linting configurations for various frameworks.         |
| [prettier](packages/prettier/README.md)   | Formatting rules for consistent code style.            |
| [jest](packages/jest/README.md)           | Testing configurations for unit and integration tests. |
| [ui](packages/ui/README.md)               | Common UI package.                                     |
| [types](packages/types/README.md)         | Common types package.                                  |
| [constants](packages/constants/README.md) | Common constants package.                              |
| [logger](packages/logger/README.md)       | Common logger package.                                 |

These packages can be added as dependencies in `apps/**` and `packages/**` to
utilize them.
