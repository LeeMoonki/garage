function mapObject(obj, predicate) {
  const result = {};

  if (typeof obj !== 'object') {
    return result;
  }

  for (const key in obj) {
    if (predicate(key, obj)) {
      result[key] = obj[key];
    }
  }

  return result;
}

function extractFields(obj, keyList, exact) {
  let compareFunction;

  if (exact) {
    compareFunction = function(key, target) {
      return key === target;
    };
  } else {
    compareFunction = function(key, target) {
      return key.indexOf(target) > -1;
    };
  }

  return mapObject(obj, (key, compObj) => {
    for (const target of keyList) {
      if (compareFunction(key, target)) {
        return true;
      }
    }
    return false;
  });
}

function removeFields(obj, keyList, exact) {
  let compareFunction;

  if (exact) {
    compareFunction = function(key, target) {
      return key === target;
    };
  } else {
    compareFunction = function(key, target) {
      return key.indexOf(target) > -1;
    };
  }

  return mapObject(obj, (key, compObj) => {
    for (const target of keyList) {
      if (compareFunction(key, target)) {
        return false;
      }
    }
    return true;
  });
}

function cloneObject(obj) {
  var clone = {};
  for (var i in obj) {
    if (typeof obj[i] === 'object' && obj[i] != null) {
      clone[i] = cloneObject(obj[i]);
    } else {
      clone[i] = obj[i];
    }
  }
  return clone;
}

function isEmptyObject(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}


const objectTools = {
  mapObject,
  extractFields,
  removeFields,
  cloneObject,
  isEmptyObject
};

module.exports = objectTools;
