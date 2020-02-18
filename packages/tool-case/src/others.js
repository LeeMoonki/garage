function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const OtherTools = {
  wait
};

export default OtherTools;
