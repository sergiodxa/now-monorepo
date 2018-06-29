if (!process.env.NOW_TOKEN) {
  throw new ReferenceError("The environment variable NOW_TOKEN is required.");
}

require("./src/index")();
