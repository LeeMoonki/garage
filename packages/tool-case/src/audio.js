/**
 * Reference : 
 * [How to slice an AudioBuffer](https://miguelmota.com/bytes/slice-audiobuffer/)
 * [Web audio concepts and usage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
 */

const AudioContext = window.AudioContext || window.webkitAudioContext;

const AudioBufferSlice = function(buffer, begin, end, callback) {
  if (!(this instanceof AudioBufferSlice)) {
    return new AudioBufferSlice(buffer, begin, end, callback);
  }

  let error = null;

  const duration = buffer.duration;
  const channels = buffer.numberOfChannels;
  const rate = buffer.sampleRate;
  
  // AudioBuffer.duration = AudioBuffer.length / AudioBuffer.sampleRate

  if (typeof end === 'function') {
    callback = end;
    end = duration * 1000;
  }

  begin = begin / 1000;
  end = end / 1000;

  if (begin < 0) {
    error = new RangeError('begin time must be greater than 0');
  }

  if (end > duration) {
    error = new RangeError('end time must be less than or equal to ' + duration);
  }

  if (typeof callback !== 'function') {
    error = new TypeError('callback must be a function');
  }

  const startOffset = rate * begin;
  const endOffset = rate * end;
  const frameCount = endOffset - startOffset;
  let newArrayBuffer;

  try {
    newArrayBuffer = new AudioContext().createBuffer(channels, frameCount, rate);
    
    const anotherArray = new Float32Array(frameCount);
    const offset = 0;

    for (let channel = 0; channel < channels; channel++) {
      buffer.copyFromChannel(anotherArray, channel, startOffset);
      newArrayBuffer.copyToChannel(anotherArray, channel, offset);
    }
  } catch (e) {
    error = e;
  }

  callback(error, newArrayBuffer);
};

const audioBufferSlice = function ({ url, begin, end, responseCallback, callback }) {
  const audioCtx = new AudioContext();
  const source = audioCtx.createBufferSource();

  fetch(url).then(res => {
    if (typeof responseCallback === 'function') {
      responseCallback(res);
    } else if (typeof callback === 'function') {
      let error = null;

      try {
        res.arrayBuffer().then(arrayBuffer => {
          audioCtx.decodeAudioData(arrayBuffer, audioBuffer => {
            AudioBufferSlice(audioBuffer, begin, end, (errorInAudioBufferSlice, slicedAudioBuffer) => {
              if (errorInAudioBufferSlice != null) {
                error = errorInAudioBufferSlice;

                console.error(error);
              } else {
                const gainNode = audioCtx.createGain();

                gainNode.gain.value = 1;

                source.buffer = slicedAudioBuffer;

                source.connect(gainNode);
                gainNode.connect(audioCtx.destination);

                callback({
                  arrayBuffer,
                  audioBuffer,
                  slicedAudioBuffer,
                  source,
                });
              }
            });
          });
        });
      } catch(e) {
        error = e;

        console.error(error);
      }
    }
  });
}

const AudioTools = {
  AudioContext,
  AudioBufferSlice,
  audioBufferSlice
};

export default AudioTools;