#!/usr/bin/env node
//shebang, interpret
const program = require('commander');
const mdLinks = require('./consumingMdLinkAPI.js')
 program
  .version('1.0.0')
  .description('md links')

program
  .arguments('[path-to-file]')
  .option('--v, --validate', 'Validate links')
  .action((path, options) => {
    mdLinks(path, options);
  });

program.parse(process.argv)
console.log(program);
//console.log('holi cli', mdLinks('./src/pruebas', { validate: true }));
