const index = require('../src/index.js');
// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });

describe('file exists', () => {
  it('should be a function', () => {
    expect(typeof index.fileExist).toBe('function');
  });
  it('should return true', () => {
    expect(index.fileExist('./')).toBe(true);
  });
  it('should return false', () => {
    expect(index.fileExist('text.txt')).toBe(false);
  });
});

describe('absolute path', () => {
  it('should be a function', () => {
    expect(typeof index.isAbsolute).toBe('function');
  });
  it('should return true', () => {
    expect(index.isAbsolute('D:/14-Java script/LIM013-fe-md-links/src/text.txt')).toBe(true);
  });
  it('should return false', () => {
    expect(index.isAbsolute('./src/text.txt')).toBe(false);
  });
});
