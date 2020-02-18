const cjs = {
  input: 'src/index.js',
  output: {
    file: `cjs/tool-case.js`,
    format: 'cjs'
  }
};

const esm = {
  input: 'src/index.js',
  output: {
    file: `esm/tool-case.js`,
    format: 'esm'
  }
};

let config = cjs;

module.exports = config;
