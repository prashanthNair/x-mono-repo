name: CI
on:
  push:
    branches: 
      - develop
  pull_request:

# This line enables permissions
permissions:
  actions: read
  contents: read

jobs:
  dev:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'npm'
      - run: npm install --force
      # This line enables distribution
      # The "--stop-agents-after" is optional, but allows idle agents to shut down once the "e2e-ci" targets have been requested
      - run: npx nx-cloud start-ci-run --distribute-on="5 linux-medium-js" --stop-agents-after="e2e-ci"
      

      - uses: nrwl/nx-set-shas@v4.0.4
      # This line is needed for nx affected to work when CI is running on a PRs
      # - run: git branch --track develop origin/develop
      - name: Create dynamic branch
        run: |
          branch_name="develop-$(date +%Y-%m-%d-%H-%M-%S)"
          git branch --track $branch_name origin/develop
      # - run: npx nx-cloud record -- --base=develop -- nx format:check
      - run: npx nx build authoring-web  --parallel=10
      