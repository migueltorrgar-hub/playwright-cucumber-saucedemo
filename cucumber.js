
module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['tsx/cjs'],
    require: [
      'src/support/**/*.ts',
      'src/step-definitions/**/*.ts'
    ],
    format: [
      'progress'
    ],
    publishQuiet: true
  }
};