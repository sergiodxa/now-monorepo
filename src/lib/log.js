exports.debug = message => {
  if (process.env.DEBUG) console.log(message);
}

exports.error = message => {
  console.error(message);
}

exports.result = message => {
  console.log(message);
}
