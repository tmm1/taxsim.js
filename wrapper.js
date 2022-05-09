async function taxsim(data) {
  let out = ''
  let err = ''
  let em = await loadTAXSIM({
    noInitialRun: true,
    noFSInit: true,

    print: function (o) {
      out += o + '\n'
    },
    printErr: function (o) {
      err += o + '\n'
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
  em.callMain()

  //console.log('taxsim results', {out, err})

  if (err) throw err

  return out
}
