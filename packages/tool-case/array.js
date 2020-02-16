function isUsefulArray(arr) {
  return arr instanceof Array && arr.length > 0;
}

const arrayTools = {
  isUsefulArray
};

module.exports = arrayTools;
