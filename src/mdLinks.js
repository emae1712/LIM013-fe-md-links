const index = require('./index.js')
//mdLinks(path, options), path can be abslute or relative, option is an object with validate property(boolean)
//return a Promise array of objects [{ href, text, file, status, message }]

const mdLinks = (path, option = { validate: false }) => {
    return new Promise ((resolve, reject) => {
    if(!index.fileExist(path)){
        reject('The path is not a string or the file does not exist')
    } else if (option.validate === true){
        resolve(index.validate(path))
    } else if(option.validate === false){
        resolve(index.getLinks(path))
    }
    })
};
console.log(mdLinks('./src/pruebas/folder 3'))
module.exports = { mdLinks };