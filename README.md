<p align="center">
<a href="https://imgbb.com/"><img src="https://i.ibb.co/4NcmPjC/md-links.png" alt="md-links" border="0"></a>
  </p>
  
# Markdown Links 👩‍💻
>NPM package that reads and analyzes files in Markdown format, to verify the links they contain and report some statistics.

## Índice

* [1. Preamble](#1-preamble)
* [2. Install](#2-install)
* [3. Usage](#3-usage)
* [4. Considerations](#4-considerartions)
* [5. Pseudocode](#5-pseudocode)
* [6. Contributing](#6-contributing)
* [7. License](#7-license)
* [8. Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias)
* [9. Objetivos de aprendizaje](#9.objetivos-de-aprendizaje)

***
## 1. 💡Preamble

<p >
  <img align="right" height="200px" src="https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg" alt="md-links">
</p>

[Markdown](https://es.wikipedia.org/wiki/Markdown) is a very popular lightweight markup language among developers. It is used in many platforms that handle plain text (GitHub, forums, blogs, ...), and it is very common to find several files in that format in any type of repository (starting with the traditional `README.md`).

These `Markdown` files usually contain _links_ that are often broken or no longer valid and that greatly damages the value of the information that you want to share.

## 2. ⬇️Install

```npm
npm install -g emae--md-links
```
## 3. 🔍Usage

After installing globally (or linking with npm link) you should have the `md-links` command available in your terminal
```bash
Usage: md-links <path-to-file> [options]

Commands:
  --v, --validate  Show validate links, makes an HTTP request to find out if the link works or not
  --s, --stats     Show basic statistics about links
  
Global options:
  -V, --version    output the version number
  -h, --help       display help for command
```
### Examples

**Input absolute or relative path to file or directory.**`Output: file, href, text` 

<p align="center">
  <img src="https://i.ibb.co/mckwRy0/path.jpg" alt="path" >
</p>

**Choose a validate option.** `Output: file, href, status, message, text` 
<p align="center">
  <a href="https://ibb.co/F8hTdKL"><img src="https://i.ibb.co/QYJwxf3/validate.jpg" alt="validate" border="0"></a>
</p>

**Choose a stats option.** `Output: Total, Unique` **or stats and validate options** `Output: Total, Unique, Broken`
<p align="center">
  <a href="https://imgbb.com/"><img src="https://i.ibb.co/fkQxMQm/stats.jpg" alt="stats" border="0"></a>
  <a href="https://imgbb.com/"><img src="https://i.ibb.co/MVrWXpK/stats-validate.jpg" alt="stats-validate" border="0"></a>
</p>

## 4. ⚠️Considerations
This package does not consider the analysis of the _node_modules_ directory, because a project can have several libraries installed, so only markdown files created by the user are considered.
<p align="center">
<a href="https://ibb.co/g4nncMr"><img src="https://i.ibb.co/jJppjv8/warning.jpg" alt="warning" border="0"></a>
</p>

If the entered path has blank spaces, place it in quotation marks to avoid being considered an error.

Example: Entering path `D:\14-Java script\LIM013-fe-md-links`
<p align="center">
<a href="https://imgbb.com/"><img src="https://i.ibb.co/vZVtZqF/error.jpg" alt="error" border="0"></a>
</p>

## 5. </>Pseudocode

### API mdLinks(path, options)

##### Arguments

* `path`: Absolute or relative path to the file or directory. If the past path is
   relative, should resolve to relative to the directory from which it is invoked
   node - _current working directory_).
* `options`: An object with the following properties:
   - `validate`: Boolean that determines if you want to validate the links
     found.

##### Return value

The function must return a promise (`Promise`) that resolves to an array
(`Array`) of objects (` Object`), where each object represents a link and contains
the following properties:

* `href`: URL found.
* `text`: Text that appeared inside the link (` <a> `).
* `file`: Path of the file where the link was found.

```js
Inicio
-Ingresar path
-Leer path
-Si (path.isAbsolute) entonces retornar path
   funcion getMdFiles
   input: path absoluto
   lista[mdFiles] = [] vacia //Definimos el array para enlistar markdown files
   //recursion
    Si (es directorio && no es node_modules) entonces
     Leer directorio 
     paraCada file de directorio
      Retornar lista[mdFiles] = file + getMdFiles(path/file)
     fin paraCada
     
    //base case
    De lo contrario Si (es file) entonces 
      Si (extensión .md) entonces
       Añadir file a lista[mdFiles]
       Retornar lista[mdFiles]
      De lo contrario
       Escribir("No existen archivos markdown en este path")
      Fin Si
    
    Fin Si
    Fin funcion
   
-De lo contrario convertir path a absoluta (path.resolve)
-Fin Si

//Get links
funcion getLinks
 input: path absoluto
 lista[mdLinks] = [] vacia //Definimos el array para enlistar links of markdown files
 
 lista[mdFiles] = getMdFiles(path)
  paraCada markdown-file de lista[mdFiles]
    Leer file
    Convertir a HTML //marked module
    Seleccionar todos los anchor, propiedad href con protocolo 'http'
   -Si(existe anchor) entonces
     paraCada anchor
      Si(validate.option == false) entonces
        Añadir objeto:{href, text, file}
        retornar lista[mdLinks]
      De lo contrario
        Hacer petición HTTP // fetch module
        Añadir propiedades: {status, message}
        retornar lista[mdLinks]
      Fin Si
     fin paraCada
   -De lo contrario
     Escribir ("No existen links en los archivos markdown de este path")
   -Fin Si
  fin paraCada
Fin funcion
```
### CLI

The executable of our application must be able to be executed as follows through the terminal:

`md-links <path-to-file> [options]`

```js
Módulo md-links <path-to-file> [options]
Pedir path
 Mostrar file, href, text
 Si(--validate) entonces
  Mostrar file, href, text, status, message
 De lo contrario Si(--stats) entonces
  Mostrar total, unique
 De lo contrario Si (--validate --stats) entonces
  Mostrar total, unique, broken
 Fin Si
Fin módulo
```

## 6. 👥Contributing
If someone wants to add or improve something, I invite you to collaborate directly in this repository: [md-links](https://github.com/emae1712/LIM013-fe-md-links)

## 7. 👁️‍🗨️License
md-links is released under the [MIT License](https://opensource.org/licenses/MIT).

## 8. Pistas, tips y lecturas complementarias

### FAQs

#### ¿Cómo hago para que mi módulo sea _instalable_ desde GitHub?

Para que el módulo sea instalable desde GitHub solo tiene que:

* Estar en un repo público de GitHub
* Contener un `package.json` válido

Con el comando `npm install githubname/reponame` podemos instalar directamente
desde GitHub. Ver [docs oficiales de `npm install` acá](https://docs.npmjs.com/cli/install).

Por ejemplo, el [`course-parser`](https://github.com/Laboratoria/course-parser)
que usamos para la currícula no está publicado en el registro público de NPM,
así que lo instalamos directamente desde GitHub con el comando `npm install
Laboratoria/course-parser`.



### Tutoriales / NodeSchool workshoppers

* [learnyounode](https://github.com/workshopper/learnyounode)
* [how-to-npm](https://github.com/workshopper/how-to-npm)
* [promise-it-wont-hurt](https://github.com/stevekane/promise-it-wont-hurt)

### Otros recursos

* [Acerca de Node.js - Documentación oficial](https://nodejs.org/es/about/)
* [Node.js file system - Documentación oficial](https://nodejs.org/api/fs.html)
* [Node.js http.get - Documentación oficial](https://nodejs.org/api/http.html#http_http_get_options_callback)
* [Node.js - Wikipedia](https://es.wikipedia.org/wiki/Node.js)
* [What exactly is Node.js? - freeCodeCamp](https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5)
* [¿Qué es Node.js y para qué sirve? - drauta.com](https://www.drauta.com/que-es-nodejs-y-para-que-sirve)
* [¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube](https://www.youtube.com/watch?v=WgSc1nv_4Gw)
* [¿Simplemente qué es Node.js? - IBM Developer Works, 2011](https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html)
* [Node.js y npm](https://www.genbeta.com/desarrollo/node-js-y-npm)
* [Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?](http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175)
* [Asíncronía en js](https://carlosazaustre.es/manejando-la-asincronia-en-javascript)
* [NPM](https://docs.npmjs.com/getting-started/what-is-npm)
* [Publicar packpage](https://docs.npmjs.com/getting-started/publishing-npm-packages)
* [Crear módulos en Node.js](https://docs.npmjs.com/getting-started/publishing-npm-packages)
* [Leer un archivo](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)
* [Leer un directorio](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)
* [Path](https://nodejs.org/api/path.html)
* [Linea de comando CLI](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)
- [Promise](https://javascript.info/promise-basics)
- [Comprendiendo Promesas en Js](https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1)
- [Pill de recursión - video](https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s)
- [Pill de recursión - repositorio](https://github.com/merunga/pildora-recursion)

## 9. Objetivos de aprendizaje

Diseñar tu propia librería es una experiencia fundamental para cualquier
desarrollador porque que te obliga a pensar en la interfaz (API) de tus
_módulos_ y cómo será usado por otros developers. Debes tener especial
consideración en peculiaridades del lenguaje, convenciones y buenas prácticas.

A continuación puedes ver los objetivos de aprendizaje de este proyecto:

### JavaScript

* [ ] Uso de condicionales (if-else | switch | operador ternario)
* [ ] Uso de funciones (parámetros | argumentos | valor de retorno)
* [ ] Manipular arrays (filter | map | sort | reduce)
* [ ] Manipular objects (key | value)
* [ ] Uso ES modules ([`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
| [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export))
* [ ] Diferenciar entre expression y statements.
* [ ] Diferenciar entre tipos de datos atómicos y estructurados.
* [ ] [Uso de callbacks.](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
* [ ] [Consumo de Promesas.](https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises)
* [ ] [Creación de Promesas.](https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/)

### Node

* [ ] Uso de sistema de archivos. ([fs](https://nodejs.org/api/fs.html), [path](https://nodejs.org/api/path.html))
* [ ] Instalar y usar módulos. ([npm](https://www.npmjs.com/))
* [ ] Creación de modules. [(CommonJS)](https://nodejs.org/docs/latest-v0.10.x/api/modules.html)
* [ ] [Configuración de package.json.](https://docs.npmjs.com/files/package.json)
* [ ] [Configuración de npm-scripts](https://docs.npmjs.com/misc/scripts)
* [ ] Uso de CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing

* [ ] [Testeo unitario.](https://jestjs.io/docs/es-ES/getting-started)
* [ ] [Testeo asíncrono.](https://jestjs.io/docs/es-ES/asynchronous)
* [ ] [Uso de librerias de Mock.](https://jestjs.io/docs/es-ES/manual-mocks)
* [ ] Uso de Mocks manuales.
* [ ] Testeo para múltiples Sistemas Operativos.

### Estructura del código y guía de estilo

* [ ] Organizar y dividir el código en módulos (Modularización)
* [ ] Uso de identificadores descriptivos (Nomenclatura | Semántica)
* [ ] Uso de linter (ESLINT)

### Git y GitHub

* [ ] Uso de comandos de git (add | commit | pull | status | push)
* [ ] Manejo de repositorios de GitHub (clone | fork | gh-pages)
* [ ] Colaboración en Github (branches | pull requests | |tags)
* [ ] Organización en Github (projects | issues | labels | milestones)

### HTTP

* [ ] Verbos HTTP ([http.get](https://nodejs.org/api/http.html#http_http_get_options_callback))

### Fundamentos de programación

* [ ] [Recursión.](https://www.youtube.com/watch?v=lPPgY3HLlhQ)

***

