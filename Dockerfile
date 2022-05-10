FROM stargate01/f90wasm
COPY taxsim.f .
RUN emfc.sh -O3 -Wall -o taxsim.f.bc -c taxsim.f
RUN emcc \
    -s WASM=1 \
    -s ERROR_ON_UNDEFINED_SYMBOLS=1 \
    -s EXPORTED_FUNCTIONS='_main' \
    -s MODULARIZE=1 \
    -s EXPORT_NAME='"loadTAXSIM"' \
    -s EXPORTED_RUNTIME_METHODS='callMain,FS' \
    -s EXIT_RUNTIME=1 \
    -o taxsim.js taxsim.f.bc lib/libgfortran.a
