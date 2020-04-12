function isArray(arr) {
  return arr instanceof Array;
}

function isEmpty(arr) {
  return arr instanceof Array && arr.length === 0;
}

function isUseful(arr) {
  return !isEmpty(arr);
}

let mapLargeArr = function(largeArr, mapper, chunkSize = 1000) {
  if (!isArray(largeArr)) { return null; }

  let res = [];

  mapLargeArr = function(d) {
    let chunk = d.splice(0, chunkSize);

    res = res.concat(chunk.map(mapper));

    return new Promise(resolve => {
      if (d.length > 0) {
        setTimeout(() => {
          resolve(mapLargeArr(d).then(res => res));
        }, 0);
      } else {
        resolve(res);
      }
    })
    
  };

  return mapLargeArr([...largeArr]);
}

const ArrayTools = {
  isArray,
  isEmpty,
  isUseful,
  mapLarge: mapLargeArr,
};

export default ArrayTools;
