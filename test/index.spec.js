const index = require('../src/index.js');

describe('file exists', () => {
  it('should be a function', () => {
    expect(typeof index.fileExist).toBe('function');
  });
  it('should return true', () => {
    expect(index.fileExist('./')).toBe(true);
  });
  it('should return false', () => {
    expect(index.fileExist('www.google.com')).toBe(false);
  });
});

describe('get an absolute path', () => {
  it('should be a function', () => {
    expect(typeof index.getAbsolutePath).toBe('function');
  });
  it('should return the same path absolute', () => {
    expect(index.getAbsolutePath('D:\\14-Java script\\LIM013-fe-md-links\\test\\md-links.spec.js')).toBe(__filename);
  });
  it('should return the absolute path of a relative path', () => {
    expect(index.getAbsolutePath('src\\mdLinks.js')).toBe('D:\\14-Java script\\LIM013-fe-md-links\\src\\mdLinks.js');
  });
});

describe('get markdown files', () => {
  it('should be a function', () => {
    expect(typeof index.getMdFiles).toBe('function');
  });
  it('should return a markdown file in a array', () => {
    expect(index.getMdFiles('D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test\\1.md')).toEqual(['D:\\14-Java script\\LIM013-fe-md-links\\test\\Directory_test\\1.md']);
  });
  it('should return markdown files from a directory in an array', () => {
    expect(index.getMdFiles(__dirname)).toEqual(['D:\\14-Java script\\LIM013-fe-md-links\\test/Directory_test/1.md',
    'D:\\14-Java script\\LIM013-fe-md-links\\test/Directory_test/folder_1/1_1.md',
    'D:\\14-Java script\\LIM013-fe-md-links\\test/Directory_test/folder_1/2.md',
    'D:\\14-Java script\\LIM013-fe-md-links\\test/Directory_test/folder_2/2.md']);
  });
});

describe('get markdown links', () => {
  it('should be a function', () => {
    expect(typeof index.getLinks).toBe('function');
  });
  it('should return a array of objects with properties [{href, text,file}]', () => {
    expect(index.getLinks('D:\\14-Java script\\LIM013-fe-md-links\\test/Directory_test/folder_1/1_1.md')[1]).toEqual(
      {
        href: 'https://github.com/Laboratoria/LIM013-fe-md-links',
        text: 'https://github.com/Laboratoria/LIM013-fe-md-links',
        file: 'D:\\14-Java script\\LIM013-fe-md-links\\test/Directory_test/folder_1/1_1.md',
      }
    );
  });
});
