FROM stargate01/f90wasm
COPY taxsim.f .
RUN emfc.sh -O3 -Wall -o taxsim.f.bc -c taxsim.f
RUN emcc \
    -s ENVIRONMENT=web,worker,node,shell \
    -s WASM=1 \
    -s ERROR_ON_UNDEFINED_SYMBOLS=1 \
    -s EXPORTED_FUNCTIONS='_main' \
    -s MODULARIZE=1 \
    -s EXPORT_NAME='"loadTAXSIM"' \
    -s EXPORTED_RUNTIME_METHODS='callMain,FS' \
    -s ASSERTIONS=0 \
    -o taxsim.js taxsim.f.bc lib/libgfortran.a
