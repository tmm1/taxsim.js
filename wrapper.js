async function taxsim(data) {
  let out = ''
  let em = await loadTAXSIM({
    noInitialRun: true,
    noFSInit: true,

    print: function (o) {
      out += o + '\n'
    },
    printErr: function (o) {
      out += o + '\n'
    },
  })

  let i = 0
  function stdin() {
    if (i < data.length) {
      return data.charCodeAt(i++)
    }
    return null
  }
  em.FS.init(stdin, null, null)

  let exitCode = em.callMain()
  //console.log('taxsim results', {exitCode, out})
  if (exitCode !== undefined && exitCode != 0) throw out

  return out
}

if (typeof exports === 'object' && typeof module === 'object')
  module.exports = taxsim;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return taxsim; });
else if (typeof exports === 'object')
  exports["taxsim"] = taxsim;