## taxsim.js

tooling to generate a JS/WebAssembly version of [NBER TAXSIM](http://taxsim.nber.org)

Uses the [gfortran/dragonegg toolchain](https://chrz.de/2020/04/21/fortran-in-the-browser/) from [StarGate01/Full-Stack-Fortran](https://github.com/StarGate01/Full-Stack-Fortran) to convert `taxsim.f` from fixed-mode f90 fortran into LLVM bitcode, then uses [emscripten](https://emscripten.org) to convert LLVM bitcode into a JS/WASM wrapper.

Note: `taxsim.f` is not included, and must be obtained separately from the NBER.

### converting `taxsim.f` to WASM

```
$ make taxsim.js
```

the [`Makefile`](Makefile) uses docker and the [stargate01/f90wasm](https://hub.docker.com/r/stargate01/f90wasm) container to compile our fortran code. see [`Dockerfile`](Dockerfile) for the build commands.

### using `taxsim.js`

```typescript
function taxsim(input: String): Promise
function taxsim(input: Object): Promise
```

```js
let input = "taxsimid,mstat,year,ltcg,idtl\n1,2,1970,100000,5"
let output = await taxsim(input)
let output = await taxsim({
  year: 2020,
  mstat: 2,
  ltcg: 100000
})
```

#### in a browser

- see [demo.html (source)](demo.html) or the [live version](https://taxsim.nber.org/taxsim35/demo.html)

#### via node.js

- bash:

  ```bash
  $ printf "year,mstat\n2020,2" | node -e "require('./taxsim.js')()"
  $ node --input-type=module -e "import taxsim from './taxsim.js'; console.log(await taxsim({year:2020,mstat:2}))"
  ```

- powershell:

  ```powershell
  > "year,mstat`n2020,2" | node -e "require('./taxsim.js')()"
  ```

#### via libv8

- [d8](https://v8.dev/docs/d8):

  ```bash
  $ printf "year,mstat\n2020,2\n" | d8 -e "load('./taxsim.js'); taxsim()"
  $ d8 -e "load('./taxsim.js'); function quit(){}; taxsim({year:2020,mstat:2}).then(console.log).catch(console.log)"
  ```

- [V8 for R](https://cran.r-project.org/web/packages/V8/index.html):

  ```r
  > download.file("https://taxsim.app/taxsim.wasm", "taxsim.wasm", mode="wb")
  > download.file("https://taxsim.app/taxsim.js", "taxsim.js")

  > library(V8)
  > ctx <- v8()
  > ctx$assign("wasmBinary", readBin("taxsim.wasm", raw(), file.info("taxsim.wasm")$size))
  > ctx$source("taxsim.js")
  > ctx$call("taxsim", JS("{year:2020, mstat:2}"), JS("{wasmBinary}"), await=TRUE)
  ```

### projects using `taxsim.js`

- https://taxsim.app ([tmm1/taxsim.app](https://github.com/tmm1/taxsim.app))
- https://www.shaneorr.io/r/usincometaxes/ ([shanejorr/usincometaxes](https://github.com/shanejorr/usincometaxes))
