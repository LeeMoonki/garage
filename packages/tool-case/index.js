const objectTools = require('./object');
const arrayTools = require('./array');
const dateTools = require('./date');
const others = require('./others');

const toolcase = {
  ...objectTools,
  ...arrayTools,
  ...dateTools,
  ...others
};

module.exports = toolcase;
