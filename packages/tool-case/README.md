# tool-case

This package has functions which are often used between projects.

# Installation

```
npm install @shinbaek/tool-case

or

yarn add @shinbaek/tool-case
```

# tool list

## - tarray

* *isArray(array)*

  Return *true* if *array* is instance of Array.

* *isEmpty(array)*

  Return *true* if *array* is array with length *0*.

* *isUseful(array)*

  Return *true* if *array* is not empty array.

* *mapLargeArr(largeArr, mapper, chunkSize = 1000)*

  Return an array mapped with *mapper*. The *largeArr* array is mapped with ***(largeArr / chunkSize) + 1*** times. For each mapping time, the mapper is called in the event queue.

  If *largeArr* is not an array, return *null*

## - taudio

* *audioBufferSlice(info)*

  The following is the example of usage.

  ```javascript
  audioBufferSlice({
    url: 'http://audiourl.com/12343512321331.wav', // the url of audio file
    // arrayBuffer, // the arrayBuffer. If set this value, audioBufferSlice do not use url
    begin: 1000, // the time of begin. (using millisecond)
    end: 5000, // the time of end. (using millisecond)
    // responseCallback, // If it is a function and url has value, this function just use the response value of url as an argument of responseCallbak and call responseCallbak.
    callback: audioSource => {
      // After slicing the audio file, callback is called with AudioSourceResult instance.
      
      audioSource.start(); // if want to start
      audioSource.start(1, 2); // if want to play from 1s to 2s for audioSource

      audioSource.pause(); // pause the player

      audioSource.stop(); // stop the player

      audioSource.on('playing', e => {
        // event called when every 10 milliseconds
        // if you want to change the time interval use
        // audioSource.setPlayingTimerInterval(time interval with millisecond)

        e.currentTime; // the context current time
        e.playingTime; // the player time
      });

      audioSource.on('pause', e => {
        // event called when the player is paused
        // e is value of AudioScheduledSourceNode ended evnet (https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode/ended_event)
      });

      audioSource.on('end', e => {
        // event called when the player end
        // e is value of AudioScheduledSourceNode ended evnet (https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode/ended_event)
      });
    },
  })
  ```

## - tdate

* *isDate(date)*

  Return *true* if *date* is Date type.

* *getLastDayOfMonth(year, month)*

  Return the last day of *year/month*. For example,

  ```javascript
  getLastDayOfMonth(2020, 3); // return 31
  ```

* *getNumOfWeeksOfMonth(year, month)*

  Return the number of weeks of *year/month*. For example,

  ```javascript
  getNumOfWeeksOfMonth(2020, 1); // return 5
  ```

* *getDatesOfMonth(year, month, onlyThisMonth)*

  Return the array of dates of *year/month*. The return data structure of it is

  ```javascript
  [{
    year, // year of this date,
    month, // month of this month. start from 1
    date, // date
    day, // day of the date
    week, // week of the date
  }, ...]
  ```

  This function returns the dates consisting calendar page. For example, if 2020/03 is passed to *getDatesOfMonth*, the result contains dates 2020/04/01, 2020/04/02, 2020/04/03, 2020/04/04. If *onlyThisMonth* is *true*, the result do not contains those dates.

  The example of usage is

  ```javascript
  getDatesOfMonth(2020, 1);

  // return 
  // [{year: 2019, month: 12, date: 29, day: 0, week: 1}, ..., {year: 2020, month: 2, date: 1, day: 6, week: 5}]


  getDatesOfMonth(2020, 1, true);

  // return 
  // [{year: 2020, month: 1, date: 1, day: 3, week: 1}, ..., {year: 2020, month: 1, date: 31, day: 5, week: 5}]
  ```

## - tobject

* *isObject(obj)*

  Return true if the *obj* is the type of Object.

* *keysOf(obj)*

  Return key list of the *obj*. If the *obj* is not an Object type, return empty array.

* *filter(obj, predicate)*

  Return an object filtered with *predicate*. The *predicate* callback function is called with *predicate(key, obj)*.

* *map(obj, mapper)*

  Return an object mapped with *mapper*. The *mapper* callback function is called with *mapper(obj[key], key, obj)*.

* *extract(obj, keyList, exact)*

  Return an object with key-value pair where the key is in keyList. If *exact* is *false(default)*, the extracted keys contain the keys of *keyList*. If *exact* is *true*, the extracted keys are equal to the *keyList*. The usage is

  ```javascript
  const obj = {
    marginTop: 10,
    margin: 20,
    paddingLeft: 30,
    padding: 50,
    foo: 200,
  };
  const keyList = ['margin', 'padding'];

  extract(obj, keyList);

  // return 
  // {
  //   marginTop: 10,
  //   margin: 20,
  //   paddingLeft: 30,
  //   padding: 50,
  // }

  extract(obj, keyList, true);

  // return 
  // {
  //   margin: 20,
  //   padding: 50,
  // }
  ```

* *remove(obj, keyList, exact)*

  Return an object with key-value pair where the key is not in keyList. The work of *exact* is same with *extract*. The usage is

  ```javascript
  const obj = {
    marginTop: 10,
    margin: 20,
    paddingLeft: 30,
    padding: 50,
    foo: 200,
  };
  const keyList = ['margin', 'padding'];

  remove(obj, keyList);

  // return 
  // { foo: 200 }

  remove(testObj, testKeyArr, true);

  // return
  // {
  //   marginTop: 10,
  //   paddingLeft: 30,
  //   foo: 200,
  // }
  ```

* *cloneObject(obj)*

  Return the deep copyed object of *obj*.

* *isEmptyObject(obj)*

  Return *true* if the *obj* if the empty object, i.e. obj === {}.

## - tother

* *wait(timeout)*

  Return the Promise after *timeout* milliseconds. The Promise resolve *undefined*.