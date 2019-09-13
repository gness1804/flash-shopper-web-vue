// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: ['vue', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'no-console': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-alert': 'off',
    'arrow-body-style': 'off',
    'global-require': 'off',
    'no-plusplus': 'off',
    'max-len': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'space-before-function-paren': 'off',
    'arrow-parens': 'off',
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
