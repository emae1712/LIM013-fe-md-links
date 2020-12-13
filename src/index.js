const fs = require('fs');
const path = require('path');
const marked = require('marked');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// pruebas
const pathTxt = './src/pruebas/text.txt';
const pruebaFileMd = './src/pruebas/1.md';
const pruebaDir = './src/pruebas'
const dirWithoutMd = './src/pruebas/folder 3';
console.log("Current directory:", __dirname);

/**************************** METHODS TO GET ABSOLUTE PATH *****************************/
//path exists, return a boolean
// const fileExist = (inputPath) => fs.existsSync(inputPath);
// const isAbsolute = (inputPath) => path.isAbsolute(inputPath);
// const convertToAbsolute = (inputPath) => path.resolve(inputPath);
// Evaluate the path and get an absolute path
const getAbsolutePath = (inputPath) => path.isAbsolute(inputPath) ? inputPath : path.resolve(inputPath);
console.log(`${pathTxt} getting an absolute path`,getAbsolutePath(pathTxt));

/*********************** METHODS TO GET FILES WITH MD EXTENSIONS **************************/
const getMdFiles = (inputPath)=>{
  //lstatSync is used to synchronously return, to refer to a file or directory
  const isFile = (inputPath) => fs.lstatSync(inputPath).isFile();
  const isDirectory = (inputPath) => fs.lstatSync(inputPath).isDirectory();
  // return a string with the extension portion of the path, TypeError if this parameter is not a string value
  const mdExtension = (inputPath) => path.extname(inputPath) == '.md';

  let mdFilesArray = [];
  const absolutePath = getAbsolutePath(inputPath);
  //base case
  if(isFile(absolutePath) && mdExtension(absolutePath)){
    mdFilesArray.push(absolutePath);
    // recursion
  } else if(isDirectory(absolutePath)){
    fs.readdirSync(absolutePath).forEach((file) =>{
      //path.join(absolutePath, file); path.join is a method that converts path segments to a single path, this case each file to absolute path
      //concat create new array, I want to re asign to mdFilesArray
      mdFilesArray = mdFilesArray.concat(getMdFiles(`${absolutePath}/${file}`));
    })
  }
  return mdFilesArray;
}
console.log("prueba", getMdFiles(pruebaDir));
//console.log("prueba file", getMdFiles(pruebaFileMd));

/*************************** METHODS TO GET LINKS FROM MD FILES *******************************/
// fs.readFileSync (), read the file and return its content
// read only links http or https
// get text content from link
// return href, text(50 characters), file path

const getLinks = (inputPath) =>{
  const mdFilesArray = getMdFiles(inputPath);
  let mdLinksArray = [];
  if(mdFilesArray.length === 0){
    console.log('Does not exist markdown files in this path');
  } else{ 
    mdFilesArray.forEach((file) =>{
    const readFile = fs.readFileSync(file, {encoding:'utf-8'}); // utf-8 ASCII code or will return buffer
    //marked module transforms document to HTML, placing HTML tags
    //JSDOM implements Web standars, mainly DOM and HTML
    const dom = new JSDOM(marked(readFile));
    const anchorsMatch = [...dom.window.document.querySelectorAll('a')];
    //returns a nodelist, a list of the elements, it can be examined like any array, forEach
    // [...] spread syntax creates an array, to use methods like map, filter etc
    const condition = anchorsMatch.filter((anchor) => anchor.href.startsWith('http'));
    condition.map((anchor)=>{
    return  mdLinksArray.push({
        href: anchor.href,
        text: anchor.textContent.slice(0,50),
        file: file,
      });
    });
  });
  return mdLinksArray;
};
};
console.log(getLinks(dirWithoutMd));


module.exports = {
  getAbsolutePath,
};
