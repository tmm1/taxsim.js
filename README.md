## taxsim.js

tooling to generate a JS/WebAssembly version of [NBER TAXSIM](http://taxsim.nber.org)

Uses the [gfortran/dragonegg toolchain](https://chrz.de/2020/04/21/fortran-in-the-browser/) from [StarGate01/Full-Stack-Fortran](https://github.com/StarGate01/Full-Stack-Fortran) to convert `taxsim.f` from fixed-mode f90 fortran into LLVM bitcode, then uses [emscripten](https://emscripten.org) to convert LLVM bitcode into a JS/WASM wrapper.

Note: `taxsim.f` is not included, and must be obtained separately from the NBER.

### converting `taxsim.f` to WASM

```
$ make taxsim.js
```

the [`Makefile`](Makefile) uses docker and the [stargate01/f90wasm](https://hub.docker.com/r/stargate01/f90wasm) container to compile our fortran code. see the [`Dockerfile`](Dockerfile) for the build instructions.

### using `taxsim.js`

see [demo.html](demo.html)
