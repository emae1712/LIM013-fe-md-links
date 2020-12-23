const fs = require('fs');
const path = require('path');
const marked = require('marked');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require('node-fetch');

/******************EVALUATE IF A STRING PATH EXISTS, IT WILL BE USED IN MDLINKS FUNCTION*************** */
//path exists, return a boolean
const fileExist = (inputPath) => (fs.existsSync(inputPath) && typeof inputPath == 'string') ? true : false;

/**************************** METHODS TO GET ABSOLUTE PATH *****************************/
// path.isAbsolute(inputPath); return a boolean
// path.resolve(inputPath); convert a path in absolute
// Evaluate the path and get an absolute path
const getAbsolutePath = (inputPath) => path.isAbsolute(inputPath) ? inputPath : path.resolve(inputPath);

/*********************** METHODS TO GET FILES WITH MD EXTENSIONS **************************/
const getMdFiles = (inputPath)=>{
  //lstatSync is used to synchronously return, to refer to a file or directory
  const isFile = (inputPath) => fs.lstatSync(inputPath).isFile();
  const isDirectory = (inputPath) => fs.lstatSync(inputPath).isDirectory();
  const mdExtension = (inputPath) => path.extname(inputPath) == '.md'; // return a string with the extension portion of the path, equal returns boolean
  const node_modules = (inputPath) => path.basename(inputPath) == 'node_modules';

  let mdFilesArray = [];
  const absolutePath = getAbsolutePath(inputPath);
  //base case
  if(isFile(absolutePath) && mdExtension(absolutePath)){
    mdFilesArray.push(absolutePath);
    // recursion
  } else if(isDirectory(absolutePath) && !node_modules(absolutePath)){
    fs.readdirSync(absolutePath).forEach((file) =>{
      //path.join(absolutePath, file); path.join is a method that converts path segments to a single path, this case each file to absolute path
      //concat create new array, I want to re asign to mdFilesArray
      mdFilesArray = mdFilesArray.concat(getMdFiles(`${absolutePath}/${file}`));
    })
  }
  return mdFilesArray;
}

/*************************** METHODS TO GET LINKS FROM MD FILES *******************************/
// fs.readFileSync (), read the file and return its content
// read only links http or https
// get text content from link
// return href, text(50 characters), file path

const getLinks = (inputPath) =>{
  const mdFilesArray = getMdFiles(inputPath);
  let mdLinksArray = [];
    mdFilesArray.forEach((file) =>{
    const readFile = fs.readFileSync(file, {encoding:'utf-8'}); // utf-8 ASCII code or will return buffer
    //marked module transforms document to HTML, placing HTML tags
    //JSDOM implements Web standars, mainly DOM and HTML
    const dom = new JSDOM(marked(readFile));
    const anchorsMatch = [...dom.window.document.querySelectorAll('a')];
    //returns a nodelist, a list of the elements, it can be examined like any array, forEach
    // [...] spread syntax creates an array, to use methods like map, filter etc
    // Href returns the entire URL, including the protocol (like http://)
    const condition = anchorsMatch.filter((anchor) => anchor.href.startsWith('http'));
      condition.forEach((anchor)=>{
        return  mdLinksArray.push({
          href: anchor.href,
          text: anchor.text.slice(0,50),
          file: file,
        });
      });
    });
  return mdLinksArray;
};
//console.log(getLinks(pruebaDir));

/********************************VALIDATE OPTION********************************* */
// make a petition  HTTP if the link works or not (fetch)
// output path, URL, ok or fail, status, text from URL [{ href, text, file, status, message }]

const validate = (inputPath) => {
  const mdLinksArrayOfObject = getLinks(inputPath);
  const validateLinks = mdLinksArrayOfObject.map((link) => fetch(link.href)
    .then((response) => {
      // response.ok return a boolean, it will be true to response.status >= 200 && response.status < 300
      if(response.ok){
      return ({...link,
        status: response.status,
        message: response.statusText
        });
      } else{
      return ({...link,
        status: response.status,
        message: 'FAIL'
        })
      }
    })
    .catch((error)=>{
      return ({...link,
      error: error.message,
      message:'FAIL'
      })
    })
  );
  //promise.all(iterable), iterable like an array, returns a promise when all promises to be success or will be rejected
  return Promise.all(validateLinks);
}

module.exports = {
  fileExist,
  getAbsolutePath,
  getMdFiles,
  getLinks,
  validate,
};
