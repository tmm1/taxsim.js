function loadScript(src) {
  return new Promise(function (resolve, reject) {
    const s = document.createElement('script')
    let r = false
    s.type = 'text/javascript'
    s.src = src
    s.async = true
    s.onerror = function (err) {
      reject(err, s)
    }
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState == 'complete')) {
        r = true
        resolve()
      }
    }
    const t = document.getElementsByTagName('script')[0]
    t.parentElement.insertBefore(s, t)
  })
}

async function taxsim(data) {
  if (!('loadTAXSIM' in window)) {
    await loadScript('taxsim.f.js')
  }

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
