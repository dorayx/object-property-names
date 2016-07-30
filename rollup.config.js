import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  moduleName: 'ObjectPropertyNames',
  moduleId: 'ObjectPropertyNames',
  plugins: [
    babel()
  ],
  targets: [
    { dest: 'build/index.es.js', format: 'es' },
    { dest: 'build/index.umd.js', format: 'umd' }
  ]
}
