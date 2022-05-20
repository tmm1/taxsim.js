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

see [demo.html (source)](demo.html) or the [live version](https://taxsim.nber.org/taxsim35/demo.html)

### projects using `taxsim.js`

- https://taxsim.app (https://github.com/tmm1/taxsim.app)
