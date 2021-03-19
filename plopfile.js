// @ts-check
module.exports = (/** @type {import('plop').NodePlopAPI} */ plop) => {
  plop.setGenerator('function', {
    description: 'cloudbase function',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'function name'
      },
      {
        type: 'input',
        name: 'description',
        message: 'function description'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'functions/{{name}}/package.json',
        templateFile: 'templates/package.hbs'
      },
      {
        type: 'add',
        path: 'functions/{{name}}/index.js',
        templateFile: 'templates/index.hbs'
      },
      {
        type: 'add',
        path: 'functions/{{name}}/app.js',
        templateFile: 'templates/app.hbs'
      },
      {
        type: 'add',
        path: 'functions/{{name}}/public/index.html',
        templateFile: 'templates/public/index.hbs'
      },
      {
        type: 'add',
        path: 'functions/{{name}}/public/favicon.ico',
        templateFile: 'templates/public/favicon.ico'
      },
      {
        type: 'modify',
        path: 'cloudbaserc.json',
        transform: (contents, data) => {
          const config = JSON.parse(contents)
          config.functions.push({
            name: data.name,
            timeout: 5,
            envVariables: {},
            runtime: 'Nodejs10.15',
            memorySize: 128,
            handler: 'index.main'
          })
          return JSON.stringify(config, null, 2)
        }
      }
    ]
  })
}
