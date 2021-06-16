const prompts =  [
    {
        type: 'list',
        name: 'type',
        message: 'What type would you like to generate?',
        choices: [
            'component',
            'utility'
        ]
    },
    {
        type: 'input',
        name: 'name',
        message: `How would you like to name it? (don't worry about casing)`
    }
];

const actions = {
    component: [
        {
            type: 'add',
            path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
            templateFile: 'config/plop/templates/component/component.hbs'
        },
        {
            type: 'add',
            path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
            templateFile: 'config/plop/templates/component/test.hbs'
        },
        {
            type: 'add',
            path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
            templateFile: 'config/plop/templates/component/storybook.hbs'
        },
        {
            type: 'add',
            path: `src/components/{{pascalCase name}}/_{{dashCase name}}.scss`,
            templateFile: 'config/plop/templates/component/scss.hbs'
        }
    ],
    utility: [
        {
            type: 'add',
            path: `src/static/js/utils/{{camelCase name}}.ts`,
            templateFile: 'config/plop/templates/utility/utility.hbs'
        },
        {
            type: 'add',
            path: `src/static/js/utils/{{camelCase name}}.test.ts`,
            templateFile: 'config/plop/templates/utility/test.hbs'
        }
    ]
};

module.exports = plop => {
    plop.setGenerator('generate', {
        description: `Generate a new component or utility`,
        prompts,
        actions: ({type}) => actions[type] || []
    });
};