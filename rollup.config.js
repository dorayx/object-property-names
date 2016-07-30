import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  moduleName: 'ObjectPropertyNames',
  moduleId: 'ObjectPropertyNames',
  plugins: [
    babel({
      presets: 'es2015-rollup',
      babelrc: false
    })
  ],
  targets: [
    { dest: 'build/index.cjs.js', format: 'cjs' },
    { dest: 'build/index.es.js', format: 'es' },
    { dest: 'build/index.umd.js', format: 'umd' }
  ]
}
