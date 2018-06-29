const { resolve } = require("path");

function getConfig() {
  const NOW_PATH = resolve(process.env.NOW_CONFIG || "./now.json");
  try {
    return require(NOW_PATH);
  } catch (error) {
    if (
      error.code === "MODULE_NOT_FOUND" ||
      error.code === "ERR_MISSING_MODULE"
    ) {
      return false;
    }
    throw error;
  }
}

module.exports = getConfig;
