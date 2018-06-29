const getConfig = require("./lib/get-config");
const log = require("./lib/log");

const now = require("./lib/now");

const token = process.env.NOW_TOKEN;

async function main() {
  const config = getConfig();

  if (config.type !== "monorepo") {
    log.result("The folder you are deploying is not a monorepo.");
    log.result("You can use Now CLI as usual.");
    return;
  } else {
    log.debug("Deplying a monorepo");
  }

  config.monorepo.apps.forEach(app => {
    log.debug(`Starting to deploy the app ${app}`);
    now({ path: app, config, token });
  });

  return;
}

module.exports = main;
