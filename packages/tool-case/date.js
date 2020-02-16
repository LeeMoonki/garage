function isDate(date) {
  if (!(date instanceof Date)) {
    return false;
  }
  return !isNaN(date);
}

const dateTools = {
  isDate
};

module.exports = dateTools;
