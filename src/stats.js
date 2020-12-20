//contain basic statistics about links
// output text Total Unique(non-repeating values)
// --stats --validate output Total Unique Broken

const stats = (mdLinksArrayOfObject)=>{
    const total = mdLinksArrayOfObject.length;
    //new Set([iterable]) return A new set object
    const unique = new Set(mdLinksArrayOfObject.map((link) => link.href)).size;
    return `✍  Total: ${total} \n★  Unique: ${unique}`
}

const broken = (mdLinksArrayOfObject)=>{
    let brokenLink = 0;
    mdLinksArrayOfObject.forEach((link) => {
        if (link.message == 'FAIL') brokenLink += 1;
      });
      return `✂  Broken: ${brokenLink}`
}

module.exports = {
    stats,
    broken,
  };
  
// console.log(broken([
//     {
//         href: 'http://www.google.com/',
//         text: 'www.google.com',
//         file: 'D:\\14-Java script\\LIM013-fe-md-links\\src\\pruebas/folder 1/folder 1.1/1.1.md',
//         status: 200,
//         message: 'OK'
//       },
//       {
//         href: 'http://google.com/noexiste',
//         text: 'http://google.com/noexiste',
//         file: 'D:\\14-Java script\\LIM013-fe-md-links\\src\\pruebas/folder 1/folder 1.1/1.1.md',
//         status: 404,
//         message: 'FAIL'
//       },
//       {
//         href: 'https://www.youtube.com/watch?v=sQAHYqX46Cs',
//         text: 'https://www.youtube.com/watch?v=sQAHYqX46Cs',
//         file: 'D:\\14-Java script\\LIM013-fe-md-links\\src\\pruebas/folder 1/folder 1.1/1.1.md',
//         status: 200,
//         message: 'OK'
//       },
//       {
//         href: 'https://github.com/Laboratoria/LIM013-fe-md-links',
//         text: 'https://github.com/Laboratoria/LIM013-fe-md-links',
//         file: 'D:\\14-Java script\\LIM013-fe-md-links\\src\\pruebas/folder 1/folder 1.1/1.1.md',
//         status: 200,
//         message: 'OK'
//       },
//       {
//         href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
//         text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
//         file: 'D:\\14-Java script\\LIM013-fe-md-links\\src\\pruebas/folder 1/folder 1.1/1.1.md',
//         status: 200,
//         message: 'OK'
//       }
//   ]));