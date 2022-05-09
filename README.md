## taxsim.js

JS/WebAssembly version of [NBER TAXSIM](http://taxsim.nber.org)

Uses the [gfortran/dragonegg toolchain](https://github.com/StarGate01/Full-Stack-Fortran) by @StarGate01 to convert `taxsim.f` from fixed-mode f90 fortran into LLVM bitcode, then uses [emscripten](https://emscripten.org) to convert LLVM bitcode into WASM + JS wrapper.

Note: `taxsim.f` is not included, and must be obtained separately from the NBER.

### converting `taxsim.f` to WASM

```
$ make taxsim.js
```

### using `taxsim.js`

see [demo.html](demo.html)
