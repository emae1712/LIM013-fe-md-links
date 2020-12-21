const option = require('../src/stats');

const mdLinksArrayOfObject = [
    {
        href: 'http://www.google.com/',
        text: 'www.google.com',
        file: 'D:\\14-Java script\\LIM013-fe-md-links\\src\\pruebas/folder 1/folder 1.1/1.1.md',
        status: 200,
        message: 'OK'
      },
      {
        href: 'http://www.google.com/',
        text: 'www.google.com',
        file: 'D:\\14-Java script\\LIM013-fe-md-links\\src\\pruebas/folder 1/folder 1.1/1.1.md',
        status: 200,
        message: 'OK'
      },
      {
        href: 'http://google.com/noexiste',
        text: 'http://google.com/noexiste',
        file: 'D:\\14-Java script\\LIM013-fe-md-links\\src\\pruebas/folder 1/folder 1.1/1.1.md',
        status: 404,
        message: 'FAIL'
      },
      {
        href: 'https://www.youtube.com/watch?v=sQAHYqX46Cs',
        text: 'https://www.youtube.com/watch?v=sQAHYqX46Cs',
        file: 'D:\\14-Java script\\LIM013-fe-md-links\\src\\pruebas/folder 1/folder 1.1/1.1.md',
        status: 200,
        message: 'OK'
      },
      {
        href: 'https://github.com/Laboratoria/LIM013-fe-md-links',
        text: 'https://github.com/Laboratoria/LIM013-fe-md-links',
        file: 'D:\\14-Java script\\LIM013-fe-md-links\\src\\pruebas/folder 1/folder 1.1/1.1.md',
        status: 200,
        message: 'OK'
      },
      {
        href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál ',
        file: 'D:\\14-Java script\\LIM013-fe-md-links\\src\\pruebas/folder 1/folder 1.1/1.1.md',
        status: 200,
        message: 'OK'
      }
  ];

describe('stats option', () => {
    it('should be a function', () => {
      expect(typeof option.stats).toBe('function');
    });
    it('should return Total and Unique links', () => {
      expect(option.stats(mdLinksArrayOfObject)).toEqual('✍  Total: 6 \n★  Unique: 5');
    });
});

describe('broken links', () => {
    it('should be a function', () => {
      expect(typeof option.broken).toBe('function');
    });
    it('should return Total and Unique links', () => {
      expect(option.broken(mdLinksArrayOfObject)).toEqual('✂  Broken: 1');
    });
});