function isObject(obj) {
  return typeof obj === 'object';
}

function keysOf(obj) {
  return isObject(obj) ? Object.keys(obj) : [];
}

function filterObject(obj, predicate) {
  const result = {};

  if (!isObject(obj)) {
    return result;
  }

  for (const key of keysOf(obj)) {
    if (predicate(key, obj)) {
      result[key] = obj[key];
    }
  }

  return result;
}

function mapObject(obj, mapper) {
  const result = {};

  if (!isObject(obj)) {
    return result;
  }

  for (const key of keysOf(obj)) {
    result[key] = mapper(obj[key], key, obj);
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

  return filterObject(obj, (key, compObj) => {
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

  return filterObject(obj, (key, compObj) => {
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
  if (keysOf(obj).length > 0) {
    return false;
  }

  return JSON.stringify(obj) === JSON.stringify({});
}


const ObjectTools = {
  isObject,
  keysOf,
  filter: filterObject,
  map: mapObject,
  extract: extractFields,
  remove: removeFields,
  cloneObject,
  isEmptyObject
};

export default ObjectTools;
