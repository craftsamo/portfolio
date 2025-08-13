const path = require("path");

const webPath = path.resolve(__dirname, "apps/web");
const dashboardPath = path.resolve(__dirname, "apps/dashboard");
const gamesPath = path.resolve(__dirname, "apps/games");

const ciWebPath = path.resolve(__dirname, "out/apps/web");
const ciDashboardPath = path.resolve(__dirname, "out/apps/dashboard");
const ciGamesPath = path.resolve(__dirname, "out/apps/games");

module.exports = {
  scripts: {
    prepare: {
      default: `nps prepare.web`,
      web: `yarn`,
      dashboard: `yarn`,
      games: `yarn`,
      ci: {
        web: `npx turbo prune --scope=web && cd out && yarn install --frozen-lockfile`,
        dashboard: `npx turbo prune --scope=dashboard && cd out && yarn install --frozen-lockfile`,
        games: `npx turbo prune --scope=games && cd out && yarn install --frozen-lockfile`,
      },
    },
    test: {
      default: `nps test.web`,
      web: `cd ${webPath} && yarn test`,
      dashboard: `cd ${dashboardPath} && yarn test`,
      games: `cd ${gamesPath} && yarn test`,
      ci: {
        default: `nps test.ci.web`,
        web: `cd ${ciWebPath} && yarn test:ci`,
        dashboard: `cd ${ciDashboardPath} && yarn test:ci`,
        games: `cd ${ciGamesPath} && yarn test:ci`,
      },
      watch: {
        default: `nps test.watch.web`,
        web: `cd ${webPath} && yarn test:watch`,
        dashboard: `cd ${dashboardPath} && yarn test:watch`,
        games: `cd ${gamesPath} && yarn test:watch`,
      },
    },
    build: {
      default: "npx turbo run build",
      ci: {
        web: "cd out && npm run build",
        dashboard: "cd out && npm run build",
        games: "cd out && npm run build",
      },
    },
    docker: {
      build: {
        default: "nps docker.build.web",
        web: `docker build -t web . -f ${webPath}/Dockerfile`,
        dashboard: `docker build -t dashboard . -f ${dashboardPath}/Dockerfile`,
        games: `docker build -t games . -f ${gamesPath}/Dockerfile`,
      },
    },
    start: {
      web: "docker compose -f docker-compose.web.yml up --build",
      dashboard: "docker compose -f docker-compose.dashboard.yml up --build",
      games: "docker compose -f docker-compose.games.yml up --build",
    },
    dev: "npx turbo run dev",
  },
};
