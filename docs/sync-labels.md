# Sync labels

**Definition**: [labels.yml](../.github/labels.yml)

This file contains the configuration for labels used in the project. Labels are
categorized by type (e.g., feature, bug, enhancement), app, workspace, and
GitHub actions. Each label includes metadata such as name, description, and
color.

**Workflow**: [sync-labels.yml](../.github/workflows/sync-labels.yml)

This GitHub Actions workflow automates the synchronization of labels defined in
`labels.yml` with the repository. It runs manually via `workflow_dispatch` and
uses the `micnncim/action-label-syncer@v1` action to sync labels. The workflow
prunes unused labels and ensures the repository remains consistent with the
configuration.

**Note**: This workflow performs a complete overwrite of existing labels in the
repository based on the `labels.yml` configuration file. Ensure that any manual
label edits in the repository are backed up or incorporated into `labels.yml` to
avoid loss of data.
