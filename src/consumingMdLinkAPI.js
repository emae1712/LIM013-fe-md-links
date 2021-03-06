const promiseMdLinks = require('./mdLinks.js');
const option = require('./stats.js');
const chalk = require('chalk');
const figlet = require('figlet');

const mdLinks = (path,options) =>{
  console.log(chalk.bold.cyanBright(figlet.textSync('md-links',{horizontalLayout: 'full'})))
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
          mdLinksArrayOfObject.forEach(mdLink => {
            if(mdLink.message == 'OK'){
              console.log('➥ ', chalk.whiteBright(mdLink.file),
                chalk.bold.blueBright('☍'), chalk.underline.italic.blueBright(mdLink.href), 
                chalk.bold.greenBright('✓', mdLink.message), 
                chalk.bold.yellow(mdLink.status),
                '“', mdLink.text, '”', 
                );
            } else{
              console.log('➥ ', chalk.whiteBright(mdLink.file),
                chalk.bold.blueBright('☍'), chalk.underline.italic.blueBright(mdLink.href), 
                chalk.bold.redBright('✗', mdLink.message), 
                chalk.bold.yellow(mdLink.status),
                '“', mdLink.text, '”')
            }
          });
        }
        if (!options.validate && options.stats) {
          console.log(stats);
        }
        if (options.validate && options.stats) {
          console.log(stats);
          console.log(broken);
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
//console.log(mdLinks('test/Directory_test', {validate: true}))