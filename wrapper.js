async function taxsim(input, opts) {
  let out = ''
  let em = await loadTAXSIM({
    noInitialRun: true,
    noFSInit: true,
    ...opts,
  })

  let data
  if (typeof input === 'string') {
    data = input
  } else if (typeof input === 'object') {
    let keys = [],
      vals = []
    for (const k in input) {
      keys.push(k)
      vals.push(input[k])
    }
    data = keys.join(',') + '\n' + vals.join(',') + '\n'
  }

  if (data !== undefined) {
    let i = 0
    function stdin() {
      if (i < data.length) {
        return data.charCodeAt(i++)
      }
      return null
    }
    function stdouterr(c) {
      out += String.fromCharCode(c)
    }
    em.FS.init(stdin, stdouterr, stdouterr)
  } else {
    em.FS.init()
  }

  let exitCode = em.callMain()
  //console.log('taxsim results', {exitCode, out})
  if (exitCode !== undefined && exitCode != 0) throw out

  return out
}

if (typeof exports === 'object' && typeof module === 'object') module.exports = taxsim
else if (typeof define === 'function' && define['amd'])
  define([], function () {
    return taxsim
  })
else if (typeof exports === 'object') exports['taxsim'] = taxsim
