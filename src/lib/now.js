const { exec } = require("child_process");
const { resolve } = require("path");
const log = require("./log");

function formatEnvs(env = {}) {
  if (Array.isArray(env)) return ''
  return Object.entries(env)
    .map(([key, value]) => `-e ${key}=${value}`)
    .join(" ")
    .trim();
}

function now({ config, path, token }) {
  const envs = formatEnvs(config.env);
  log.debug("Global variables found");

  const isPublic = config.public;
  log.debug("Checked if it's a public deployment");

  return new Promise((resolve, reject) => {
    const command = `now ./${path} ${envs} --token=${token} ${
      isPublic ? "--public" : ""
    }`;
    log.debug(`Deploy command formatted ${command}`)

    const proc = exec(command);
    log.debug("Command executed");

    proc.stdout.on('data', (url) => {
      if (!url) reject(new Error('Could not parse url'));
      log.result(`> Ready! ${url}`);
      resolve(url);
    });

    proc.stderr.on('data', (error) => {
      reject(new Error(error));
    });

    proc.on('close', () => {
      log.result(`> Deployment of ${path} completed!`);
    });
  });
}

module.exports = now;
