const path = require("path");

const webPath = path.resolve(__dirname, "apps/web");
const dashboardPath = path.resolve(__dirname, "apps/dashboard");

const ciWebPath = path.resolve(__dirname, "out/apps/web");
const ciDashboardPath = path.resolve(__dirname, "out/apps/dashboard");

module.exports = {
  scripts: {
    prepare: {
      default: `nps prepare.web`,
      web: `yarn`,
      dashboard: `yarn`,
      ci: {
        web: `npx turbo prune --scope=web && cd out && yarn install --frozen-lockfile`,
        dashboard: `npx turbo prune --scope=dashboard && cd out && yarn install --frozen-lockfile`,
      },
    },
    test: {
      default: `nps test.web`,
      web: `cd ${webPath} && yarn test`,
      dashboard: `cd ${dashboardPath} && yarn test`,
      ci: {
        default: `nps test.ci.web`,
        web: `cd ${ciWebPath} && yarn test:ci`,
        dashboard: `cd ${ciDashboardPath} && yarn test:ci`,
      },
      watch: {
        default: `nps test.watch.web`,
        web: `cd ${webPath} && yarn test:watch`,
        dashboard: `cd ${dashboardPath} && yarn test:watch`,
      },
    },
    build: {
      default: "npx turbo run build",
      ci: {
        web: "cd out && npm run build",
        dashboard: "cd out && npm run build",
      },
    },
    docker: {
      build: {
        default: "nps docker.build.web",
        web: `docker build -t web . -f ${webPath}/Dockerfile`,
        dashboard: `docker build -t dashboard . -f ${dashboardPath}/Dockerfile`,
      },
    },
    start: {
      web: "docker compose -f docker-compose.web.yml up --build",
      dashboard: "docker compose -f docker-compose.dashboard.yml up --build",
    },
    dev: "npx turbo run dev",
  },
};
