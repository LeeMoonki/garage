function isDate(date) {
  if (!(date instanceof Date)) {
    return false;
  }
  return !isNaN(date);
}

const DateTools = {
  isDate
};

export default DateTools;
