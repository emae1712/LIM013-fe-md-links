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
 