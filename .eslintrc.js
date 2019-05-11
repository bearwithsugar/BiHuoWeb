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
	// https://github.com/standard/standard/blob/master/docs/RULES-en.md
	extends: 'standard',
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	'rules': {
		// 采用空格缩进
		"indent": ['error', 2],
		"no-tabs": 'off',
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow async-await
		'generator-star-spacing': 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		// 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
		'quotes': ['error', 'single', { 'avoidEscape': true }],
    "semi": ["error", "never"],
	}
}
