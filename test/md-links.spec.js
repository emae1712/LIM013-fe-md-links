const mdLinks = require('../src/mdLinks.js');

const mdLinksArrayOfObject = [
        {
          href: 'http://www.google.com/',
          text: 'www.google.com',
          file: 'D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test/folder_1/1_1.md',
          status: 200,
          message: 'OK'
        },
        {
          href: 'https://github.com/Laboratoria/LIM013-fe-md-links',
          text: 'https://github.com/Laboratoria/LIM013-fe-md-links',
          file: 'D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test/folder_1/1_1.md',
          status: 200,
          message: 'OK'
        },
        {
          href: 'https://www.youtube.com/watch?v=sQAHYqX46Cs',
          text: 'https://www.youtube.com/watch?v=sQAHYqX46Cs',
          file: 'D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test/folder_1/1_1.md',
          status: 200,
          message: 'OK'
        },
        {
          href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
          text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
          file: 'D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test/folder_1/1_1.md',
          status: 200,
          message: 'OK'
        },
        {
          href: 'https://0.0.0.1/',
          text: 'https://1',
          file: 'D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test/folder_1/1_1.md',
          error: 'request to https://0.0.0.1/ failed, reason: connect ENETUNREACH 0.0.0.1:443',
          message: 'FAIL'
        },
        {
          href: 'http://google.com/noexiste',
          text: 'http://google.com/noexiste',
          file: 'D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test/folder_1/1_1.md',
          status: 404,
          message: 'FAIL'
        }
      ]

const arrayValidateFalse = [
    {
      href: 'http://www.google.com/',
      text: 'www.google.com',
      file: 'D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test/folder_1/1_1.md'
    },
    {
      href: 'https://github.com/Laboratoria/LIM013-fe-md-links',
      text: 'https://github.com/Laboratoria/LIM013-fe-md-links',
      file: 'D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test/folder_1/1_1.md'
    },
    {
      href: 'https://www.youtube.com/watch?v=sQAHYqX46Cs',
      text: 'https://www.youtube.com/watch?v=sQAHYqX46Cs',
      file: 'D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test/folder_1/1_1.md'
    },
    {
      href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
      text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
      file: 'D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test/folder_1/1_1.md'
    },
    {
      href: 'https://0.0.0.1/',
      text: 'https://1',
      file: 'D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test/folder_1/1_1.md'
    },
    {
      href: 'http://google.com/noexiste',
      text: 'http://google.com/noexiste',
      file: 'D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test/folder_1/1_1.md'
    }
  ]
describe('file exists', () => {
    it('should be a function', () => {
      expect(typeof mdLinks).toBe('function');
    });
    it('should return an array with validate links', () =>{mdLinks('test/Directory_test', {validate: true})
      .then(response =>{
        expect(response).toEqual(mdLinksArrayOfObject);
      })
      
    });
    it('should return an array with validate links', () =>{mdLinks('test/Directory_test', {validate: false})
      .then(response =>{
        expect(response).toEqual(arrayValidateFalse);
      })
    });
    it('should return an error, because the path does not exist', () =>{mdLinks('test/Directory_tet', {validate: true})
      .catch(err =>{
        expect(err.message).toEqual("ENOENT: no such file or directory, lstat 'D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_tet'");
      })
    });
    it('should return a warning, the path does not contain markdown files', () =>{mdLinks('test/Directory_test/folder_3')
      .catch(err =>{
        expect(err).toEqual("Does not exist markdown files in this path 'test/Directory_test/folder_3'");
      })
    });
    it('should return a warning, the path does not contain links to evaluate', () =>{mdLinks('test/Directory_test/folder_2')
      .catch(err =>{
        expect(err).toEqual("Does not exist links to evaluate in this path 'test/Directory_test/folder_2'");
      })
    });
  });
  