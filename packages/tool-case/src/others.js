function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const otherTools = {
  wait
};

export default otherTools;
