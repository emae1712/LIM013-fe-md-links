const promiseMdLinks = require('./mdLinks.js');
const option = require('./stats.js');
const chalk = require('chalk');

const mdLinks = (path,options) =>{
  promiseMdLinks(path,options)
    .then((mdLinksArrayOfObject)=>{
      const stats = option.stats(mdLinksArrayOfObject);
      const broken = option.broken(mdLinksArrayOfObject);
        if(!options.validate && !options.stats){
          mdLinksArrayOfObject.forEach(mdLink => {
            console.log(
              '➥ ', chalk.whiteBright(mdLink.file),
              chalk.bold.blueBright('☍'), chalk.underline.italic.blueBright(mdLink.href), 
              '“', mdLink.text, '”', 
              );
          });
        } 
        if(options.validate && !options.stats){
          console.log('im here');
        }
    })
    .catch((err)=>{
      if (err.message) {
        console.log(chalk.bold.red('✖ ' + err));
      }else{
        console.log(chalk.bold.keyword('orange')('⚠ ' + err));
      }
      
    })
return mdLinks;
}
module.exports = mdLinks;
console.log(mdLinks('./src/pruebas/folder 2', {validate: false}))