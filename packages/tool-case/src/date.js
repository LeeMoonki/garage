function isDate(date) {
  if (!(date instanceof Date)) {
    return false;
  }
  return !isNaN(date);
}

export const getLastDayOfMonth = function(year, month) {
  return new Date(year, month, 0).getDate();
};

export const getNumOfWeeksOfMonth = function(year, month) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const numOfDays = getLastDayOfMonth(year, month);
  const firstSaturday = 7 - firstDay;

  return Math.ceil((numOfDays - firstSaturday) / 7) + 1;
};

/**
 * get dates of month
 * @param {number} year year
 * @param {number} month with no zero base 
 * @param {boolean} onlyThisMonth The return value contain last month or next month dates if needed. If you need only this month, set this true.
 */
export const getDatesOfMonth = function(year, month, onlyThisMonth) {
  let result = [];
  const date = new Date(year, month - 1, 1);
  const lastDate = getLastDayOfMonth(year, month);
  
  if (!onlyThisMonth) {
    for (let i = 1 - date.getDay(); i < 1; ++i) {
      let d = new Date(year, month - 1, i);
  
      result.push({
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        date: d.getDate(),
        day: d.getDay(),
        week: 1,
      });
    }
  }
  
  for (let i = 1, day = date.getDay(), len = lastDate; i <= len; ++i) {
    result.push({
      year,
      month,
      date: i,
      day: (result.length + (onlyThisMonth ? day : 0)) % 7,
      week: ~~(result.length / 7) + 1,
    });
  }

  if (!onlyThisMonth && result.length % 7 !== 0) {
    // this part shows that the if 'onlyThisMonth' is false, 'result.length' is guaranteed to be a multiple of 7.
    for (let i = result.length % 7, j = 1; i <= 6; ++i, ++j) {
      let d = new Date(year, month - 1, lastDate + j);
  
      result.push({
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        date: j,
        day: i,
        week: ~~(result.length / 7) + 1,
      });
    }
  }

  return result;
};

const DateTools = {
  isDate,
  getLastDayOfMonth,
  getNumOfWeeksOfMonth,
  getDatesOfMonth
};

export default DateTools;
