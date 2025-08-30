# AGENTS

This is a monorepo with TypeScript. The project turborepo and uses yarn
workspaces for package management.

## Project Structure

1. `apps/**`: Each service is built as a Next.js application. They are routed to
   different subdomains within the same origin.

2. `packages/**`: See the [Internal Packages](/README.md#internal-packages)
   section.

3. `docs/guidelines/*.md`: Various guidelines for this project are described
   here.

## Monorepo Conventions

Import shared modules using workspace names: `@workspace/**`
