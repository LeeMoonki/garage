function isEmpty(arr) {
  return arr instanceof Array && arr.length === 0;
}

function isUseful(arr) {
  return !isEmpty(arr);
}

const ArrayTools = {
  isEmpty,
  isUseful
};

export default ArrayTools;
