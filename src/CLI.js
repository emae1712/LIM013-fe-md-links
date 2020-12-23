#!/usr/bin/env node
//shebang, compiler-interpreter of node, which allows running node as executable from anywhere in the terminal
// we can execute our program with a specific self-registered word "md-links"(bin section)
const program = require('commander');
const mdLinks = require('./consumingMdLinkAPI.js')
 program
  .version('1.0.0')
  .description('md-links is an executable that reads and analyzes files in Markdown format, to verify the links they contain and report some statistics.')

program
  .arguments('<path-to-file>') //<> requerid argument
  .option('--v, --validate', 'Show validate links, makes an HTTP request to find out if the link works or not')
  .option('--s, --stats', 'Show basic statistics about links')
  .action((path, options) => {
    mdLinks(path, options);
  });

program.parse(process.argv) //is a interface to get arguments by the shell when run the command line, returns an array called argv (argument-values)

console.log(process.argv);
//console.log('hola cli');
